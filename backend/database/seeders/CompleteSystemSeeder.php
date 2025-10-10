<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\User;
use App\Models\Evaluation;
use Illuminate\Support\Facades\DB;

class CompleteSystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Starting complete system seeding...');

        // Get instructors and students
        $instructors = User::where('role', 'instructor')->get();
        $students = User::where('role', 'student')->get();

        if ($instructors->isEmpty()) {
            $this->command->error('No instructors found. Please create instructors first.');
            return;
        }

        if ($students->isEmpty()) {
            $this->command->error('No students found. Please create students first.');
            return;
        }

        // Step 1: Create Courses
        $this->command->info('Creating courses...');
        $coursesData = [
            [
                'course_code' => 'CS101',
                'course_name' => 'Introduction to Computer Science',
                'description' => 'Fundamental concepts of computer science including programming basics, data structures, and algorithms.',
                'credits' => 3,
                'semester' => 'Fall',
                'year' => 2024,
            ],
            [
                'course_code' => 'CS201',
                'course_name' => 'Data Structures and Algorithms',
                'description' => 'In-depth study of data structures, algorithm design, and computational complexity.',
                'credits' => 4,
                'semester' => 'Fall',
                'year' => 2024,
            ],
            [
                'course_code' => 'CS301',
                'course_name' => 'Database Management Systems',
                'description' => 'Design and implementation of relational databases, SQL, and database optimization.',
                'credits' => 3,
                'semester' => 'Fall',
                'year' => 2024,
            ],
            [
                'course_code' => 'CS302',
                'course_name' => 'Web Development',
                'description' => 'Modern web development techniques including HTML, CSS, JavaScript, and frameworks.',
                'credits' => 3,
                'semester' => 'Fall',
                'year' => 2024,
            ],
            [
                'course_code' => 'CS401',
                'course_name' => 'Software Engineering',
                'description' => 'Software development lifecycle, design patterns, and project management.',
                'credits' => 4,
                'semester' => 'Fall',
                'year' => 2024,
            ],
        ];

        $courses = [];
        foreach ($coursesData as $courseData) {
            $course = Course::create([
                ...$courseData,
                'instructor_id' => $instructors->random()->id,
            ]);
            $courses[] = $course;
        }

        $this->command->info(count($courses) . ' courses created.');

        // Step 2: Create Enrollments
        $this->command->info('Creating enrollments...');
        $enrollmentCount = 0;

        foreach ($students as $student) {
            // Enroll each student in 2-4 random courses
            $numCourses = rand(2, 4);
            $selectedCourses = collect($courses)->random($numCourses);

            foreach ($selectedCourses as $course) {
                // Check if enrollment already exists
                $exists = DB::table('enrollments')
                    ->where('student_id', $student->id)
                    ->where('course_id', $course->id)
                    ->exists();

                if (!$exists) {
                    DB::table('enrollments')->insert([
                        'course_id' => $course->id,
                        'student_id' => $student->id,
                        'status' => 'active',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    $enrollmentCount++;
                }
            }
        }

        $this->command->info($enrollmentCount . ' enrollments created.');

        // Step 3: Create Evaluations
        $this->command->info('Creating evaluations...');

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

        $evaluationCount = 0;
        $evaluationsToInsert = [];

        foreach ($students as $student) {
            // Get courses the student is enrolled in
            $enrolledCourseIds = DB::table('enrollments')
                ->where('student_id', $student->id)
                ->pluck('course_id');

            foreach ($enrolledCourseIds as $courseId) {
                $course = collect($courses)->firstWhere('id', $courseId);

                // Create 2-3 evaluations per course (reduced for efficiency)
                $numEvaluations = rand(2, 3);

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
                    $percentage = ($score / $maxScore) * 100;

                    // Calculate grade
                    if ($percentage >= 90) $grade = 'A';
                    elseif ($percentage >= 85) $grade = 'A-';
                    elseif ($percentage >= 80) $grade = 'B+';
                    elseif ($percentage >= 75) $grade = 'B';
                    elseif ($percentage >= 70) $grade = 'B-';
                    elseif ($percentage >= 65) $grade = 'C+';
                    elseif ($percentage >= 60) $grade = 'C';
                    elseif ($percentage >= 55) $grade = 'C-';
                    elseif ($percentage >= 50) $grade = 'D';
                    else $grade = 'F';

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

                    // Add to batch insert array
                    $evaluationsToInsert[] = [
                        'course_id' => $courseId,
                        'student_id' => $student->id,
                        'instructor_id' => $course->instructor_id,
                        'evaluation_type' => $type,
                        'title' => $title,
                        'description' => "Evaluation for {$title} in {$course->course_name}",
                        'score' => $score,
                        'max_score' => $maxScore,
                        'percentage' => $percentage,
                        'grade' => $grade,
                        'feedback' => $feedback['feedback'],
                        'strengths' => $feedback['strengths'],
                        'areas_for_improvement' => $feedback['areas_for_improvement'],
                        'evaluation_date' => $evaluationDate,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];

                    $evaluationCount++;

                    // Insert in batches of 50 to avoid memory issues
                    if (count($evaluationsToInsert) >= 50) {
                        DB::table('evaluations')->insert($evaluationsToInsert);
                        $evaluationsToInsert = [];
                    }
                }
            }
        }

        // Insert remaining evaluations
        if (count($evaluationsToInsert) > 0) {
            DB::table('evaluations')->insert($evaluationsToInsert);
        }

        $this->command->info($evaluationCount . ' evaluations created.');
        $this->command->info('Complete system seeding finished successfully!');
    }
}
