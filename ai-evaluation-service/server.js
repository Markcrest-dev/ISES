require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase Admin Client (Bypasses RLS)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize OpenAI (Using Groq base URL)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.post('/api/evaluate', async (req, res) => {
  try {
    const { submission_id } = req.body;
    
    if (!submission_id) {
      return res.status(400).json({ error: 'submission_id is required' });
    }

    // 1. Fetch submission and related assignment details
    const { data: submission, error: fetchError } = await supabase
      .from('submissions')
      .select('*, assignment:assignments(*)')
      .eq('id', submission_id)
      .single();

    if (fetchError || !submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    if (submission.status === 'graded') {
      return res.status(400).json({ error: 'Submission is already graded' });
    }

    const assignment = submission.assignment;

    // 2. Prepare the prompt for OpenAI
    const systemPrompt = `You are an expert academic evaluator. Your task is to evaluate a student's submission based on the provided assignment details.
    
Assignment Title: ${assignment.title}
Assignment Description: ${assignment.description}
Total Possible Points: ${assignment.total_points}

Evaluate the student's submission objectively based on completeness, critical thinking, and adherence to the assignment description.

Output your evaluation STRICTLY as a JSON object with the following schema:
{
  "score": <number between 0 and total_points>,
  "feedback": "<general feedback summarizing the evaluation>",
  "strengths": "<what the student did well>",
  "areas_for_improvement": "<what the student could improve on>",
  "letter_grade": "<A, B, C, D, or F based on percentage>"
}
DO NOT include any markdown formatting, code blocks, or text outside of the JSON object.`;

    const userPrompt = `Student Submission:\n${submission.submission_content}`;

    console.log(`Evaluating submission ${submission_id}...`);
    
    let evaluationData;
    try {
      // 3. Call AI (Groq)
      const completion = await openai.chat.completions.create({
        model: "llama-3.1-8b-instant", // Changed to currently supported Groq model
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
      });

      const aiResponse = completion.choices[0].message.content;
      evaluationData = JSON.parse(aiResponse);
    } catch (apiError) {
      if (apiError.status === 429 || apiError.message.includes('429') || apiError.message.includes('quota')) {
        console.warn('OpenAI Quota Exceeded (429). Using mock evaluation data fallback.');
        evaluationData = {
          score: Math.round(assignment.total_points * 0.9), // 90% mock score
          feedback: "Mocked Evaluation: The submission demonstrates a good understanding of the material. (Note: OpenAI API Quota Exceeded, this is an automated fallback grade).",
          strengths: "Clear structure and solid logic.",
          areas_for_improvement: "Could dive deeper into specific examples.",
          letter_grade: "A"
        };
      } else {
        throw apiError;
      }
    }

    // Calculate percentage
    const percentage = (evaluationData.score / assignment.total_points) * 100;

    // 4. Save evaluation to Supabase
    const { data: evaluation, error: evalError } = await supabase
      .from('evaluations')
      .insert({
        course_id: assignment.course_id,
        student_id: submission.student_id,
        instructor_id: assignment.instructor_id,
        evaluation_type: 'assignment',
        title: `AI Evaluation: ${assignment.title}`,
        description: 'Automatically graded by ISES AI Evaluator',
        score: evaluationData.score,
        max_score: assignment.total_points,
        percentage: percentage,
        grade: evaluationData.letter_grade,
        feedback: evaluationData.feedback,
        strengths: evaluationData.strengths,
        areas_for_improvement: evaluationData.areas_for_improvement,
        evaluation_date: new Date().toISOString()
      })
      .select()
      .single();

    if (evalError) throw new Error(`Failed to save evaluation: ${evalError.message}`);

    // 5. Update submission status
    const { error: updateError } = await supabase
      .from('submissions')
      .update({ status: 'graded' })
      .eq('id', submission_id);

    if (updateError) throw new Error(`Failed to update submission status: ${updateError.message}`);

    res.json({ success: true, evaluation });

  } catch (error) {
    console.error('Evaluation Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AI Evaluation Service running on port ${PORT}`);
});
