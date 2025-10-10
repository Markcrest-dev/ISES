<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Evaluation;
use App\Models\User;
use App\Models\Course;
use Illuminate\Support\Facades\DB;

class EvaluationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all students
        $students = User::where('role', 'student')->get();

        // Get all instructors
        $instructors = User::where('role', 'instructor')->get();

        // Get all courses
        $courses = Course::all();

        if ($students->isEmpty() || $instructors->isEmpty() || $courses->isEmpty()) {
            $this->command->warn('No students, instructors, or courses found. Skipping evaluation seeding.');
            return;
        }

        // Evaluation types with example titles
        $evaluationTypes = [
            'assignment' => [
                'Assignment 1 - Introduction to Programming',
                'Assignment 2 - Data Structures',
                'Assignment 3 - Algorithm Analysis',
                'Assignment 4 - Web Development',
            ],
            'quiz' => [
                'Quiz 1 - Variables and Data Types',
                'Quiz 2 - Control Structures',
                'Quiz 3 - Functions and Methods',
                'Quiz 4 - Object-Oriented Programming',
            ],
            'midterm' => [
                'Midterm Exam - First Half Review',
            ],
            'final' => [
                'Final Exam - Comprehensive Assessment',
            ],
            'project' => [
                'Course Project - Part 1',
                'Course Project - Part 2',
                'Final Project Submission',
            ],
            'participation' => [
                'Class Participation - Week 1-5',
                'Class Participation - Week 6-10',
            ],
        ];

        // Feedback templates
        $feedbackTemplates = [
            'excellent' => [
                'feedback' => 'Outstanding performance! You have demonstrated excellent understanding of the course material and applied concepts effectively.',
                'strengths' => 'Strong analytical skills, clear communication, thorough understanding of concepts, excellent problem-solving abilities.',
                'areas_for_improvement' => 'Continue exploring advanced topics and consider taking on leadership roles in group projects.',
            ],
            'good' => [
                'feedback' => 'Good work overall. You have shown solid understanding of the material with room for improvement in some areas.',
                'strengths' => 'Good grasp of fundamental concepts, consistent effort, willingness to learn.',
                'areas_for_improvement' => 'Focus on developing deeper understanding of complex topics and practice more challenging problems.',
            ],
            'average' => [
                'feedback' => 'You are meeting the basic requirements. More engagement with the course material would help improve your performance.',
                'strengths' => 'Shows basic understanding of core concepts, completes assignments on time.',
                'areas_for_improvement' => 'Increase study time, seek help during office hours, participate more actively in class discussions.',
            ],
            'needs_improvement' => [
                'feedback' => 'Your performance indicates you are struggling with the course material. Please seek additional help and resources.',
                'strengths' => 'Shows effort and willingness to learn, attends classes regularly.',
                'areas_for_improvement' => 'Schedule meetings with instructor, join study groups, dedicate more time to practice problems and review materials.',
            ],
        ];

        $this->command->info('Creating dummy evaluations...');

        // Create evaluations for each student
        foreach ($students as $student) {
            // Get courses the student is enrolled in
            $enrolledCourses = DB::table('enrollments')
                ->where('student_id', $student->id)
                ->pluck('course_id');

            if ($enrolledCourses->isEmpty()) {
                continue;
            }

            // Create 3-5 evaluations per course
            foreach ($enrolledCourses as $courseId) {
                $course = $courses->find($courseId);
                $instructor = $instructors->random();

                // Number of evaluations for this course (3-5)
                $numEvaluations = rand(3, 5);

                for ($i = 0; $i < $numEvaluations; $i++) {
                    // Select random evaluation type
                    $types = array_keys($evaluationTypes);
                    $type = $types[array_rand($types)];

                    // Get a title for this type
                    $titles = $evaluationTypes[$type];
                    $title = $titles[array_rand($titles)];

                    // Generate random score between 50-100
                    $score = rand(50, 100);
                    $maxScore = 100;

                    // Determine feedback category based on score
                    if ($score >= 90) {
                        $feedbackCategory = 'excellent';
                    } elseif ($score >= 75) {
                        $feedbackCategory = 'good';
                    } elseif ($score >= 60) {
                        $feedbackCategory = 'average';
                    } else {
                        $feedbackCategory = 'needs_improvement';
                    }

                    $feedback = $feedbackTemplates[$feedbackCategory];

                    // Generate random date within the last 3 months
                    $daysAgo = rand(1, 90);
                    $evaluationDate = now()->subDays($daysAgo);

                    // Create the evaluation
                    Evaluation::create([
                        'course_id' => $courseId,
                        'student_id' => $student->id,
                        'instructor_id' => $instructor->id,
                        'evaluation_type' => $type,
                        'title' => $title,
                        'description' => "Evaluation for {$title} in {$course->course_name}",
                        'score' => $score,
                        'max_score' => $maxScore,
                        'feedback' => $feedback['feedback'],
                        'strengths' => $feedback['strengths'],
                        'areas_for_improvement' => $feedback['areas_for_improvement'],
                        'evaluation_date' => $evaluationDate,
                    ]);
                }
            }
        }

        $this->command->info('Dummy evaluations created successfully!');
    }
}
