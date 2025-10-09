<?php

namespace App\Http\Controllers;

use App\Models\Evaluation;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EvaluationController extends Controller
{
    /**
     * Get all evaluations for a student
     */
    public function studentEvaluations(Request $request)
    {
        $user = $request->user();

        $evaluations = Evaluation::where('student_id', $user->id)
            ->with(['course', 'instructor'])
            ->orderBy('evaluation_date', 'desc')
            ->get();

        return response()->json(['evaluations' => $evaluations], 200);
    }

    /**
     * Get all evaluations created by an instructor
     */
    public function instructorEvaluations(Request $request)
    {
        $user = $request->user();

        $evaluations = Evaluation::where('instructor_id', $user->id)
            ->with(['course', 'student'])
            ->orderBy('evaluation_date', 'desc')
            ->get();

        return response()->json(['evaluations' => $evaluations], 200);
    }

    /**
     * Get evaluations for a specific course
     */
    public function courseEvaluations($courseId)
    {
        $course = Course::findOrFail($courseId);

        $evaluations = Evaluation::where('course_id', $courseId)
            ->with(['student', 'instructor'])
            ->orderBy('evaluation_date', 'desc')
            ->get();

        return response()->json(['evaluations' => $evaluations], 200);
    }

    /**
     * Create a new evaluation
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|exists:courses,id',
            'student_id' => 'required|exists:users,id',
            'evaluation_type' => 'required|in:midterm,final,assignment,quiz,project,participation',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'score' => 'required|numeric|min:0',
            'max_score' => 'required|numeric|min:1',
            'feedback' => 'nullable|string',
            'strengths' => 'nullable|string',
            'areas_for_improvement' => 'nullable|string',
            'evaluation_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Validate score doesn't exceed max_score
        if ($request->score > $request->max_score) {
            return response()->json([
                'message' => 'Score cannot exceed maximum score'
            ], 422);
        }

        $evaluation = Evaluation::create([
            'course_id' => $request->course_id,
            'student_id' => $request->student_id,
            'instructor_id' => $request->user()->id,
            'evaluation_type' => $request->evaluation_type,
            'title' => $request->title,
            'description' => $request->description,
            'score' => $request->score,
            'max_score' => $request->max_score,
            'feedback' => $request->feedback,
            'strengths' => $request->strengths,
            'areas_for_improvement' => $request->areas_for_improvement,
            'evaluation_date' => $request->evaluation_date,
        ]);

        $evaluation->load(['course', 'student']);

        return response()->json([
            'message' => 'Evaluation created successfully',
            'evaluation' => $evaluation
        ], 201);
    }

    /**
     * Update an evaluation
     */
    public function update(Request $request, $id)
    {
        $evaluation = Evaluation::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'evaluation_type' => 'sometimes|in:midterm,final,assignment,quiz,project,participation',
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'score' => 'sometimes|numeric|min:0',
            'max_score' => 'sometimes|numeric|min:1',
            'feedback' => 'nullable|string',
            'strengths' => 'nullable|string',
            'areas_for_improvement' => 'nullable|string',
            'evaluation_date' => 'sometimes|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $evaluation->update($request->all());
        $evaluation->load(['course', 'student']);

        return response()->json([
            'message' => 'Evaluation updated successfully',
            'evaluation' => $evaluation
        ], 200);
    }

    /**
     * Delete an evaluation
     */
    public function destroy($id)
    {
        $evaluation = Evaluation::findOrFail($id);
        $evaluation->delete();

        return response()->json([
            'message' => 'Evaluation deleted successfully'
        ], 200);
    }

    /**
     * Get student performance summary
     */
    public function studentPerformanceSummary($studentId)
    {
        $evaluations = Evaluation::where('student_id', $studentId)
            ->with('course')
            ->get();

        $summary = [
            'total_evaluations' => $evaluations->count(),
            'average_percentage' => $evaluations->avg('percentage'),
            'by_type' => [],
            'by_course' => [],
        ];

        // Group by evaluation type
        $byType = $evaluations->groupBy('evaluation_type');
        foreach ($byType as $type => $typeEvaluations) {
            $summary['by_type'][$type] = [
                'count' => $typeEvaluations->count(),
                'average' => $typeEvaluations->avg('percentage'),
            ];
        }

        // Group by course
        $byCourse = $evaluations->groupBy('course_id');
        foreach ($byCourse as $courseId => $courseEvaluations) {
            $course = $courseEvaluations->first()->course;
            $summary['by_course'][] = [
                'course_code' => $course->course_code,
                'course_name' => $course->course_name,
                'count' => $courseEvaluations->count(),
                'average' => $courseEvaluations->avg('percentage'),
            ];
        }

        return response()->json(['summary' => $summary], 200);
    }
}
