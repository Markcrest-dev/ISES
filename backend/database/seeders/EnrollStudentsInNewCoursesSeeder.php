<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Course;
use Illuminate\Support\Facades\DB;

class EnrollStudentsInNewCoursesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Enrolling students in courses...');

        // Get all students
        $students = User::where('role', 'student')->get();

        if ($students->isEmpty()) {
            $this->command->error('No students found.');
            return;
        }

        // Get all courses
        $courses = Course::all();

        if ($courses->isEmpty()) {
            $this->command->error('No courses found.');
            return;
        }

        $enrollmentCount = 0;

        foreach ($students as $student) {
            // Get student's current enrollments
            $currentEnrollments = DB::table('enrollments')
                ->where('student_id', $student->id)
                ->pluck('course_id')
                ->toArray();

            // Enroll student in 3-5 additional random courses they're not already enrolled in
            $availableCourses = $courses->whereNotIn('id', $currentEnrollments);

            if ($availableCourses->isNotEmpty()) {
                $numEnrollments = min(rand(3, 5), $availableCourses->count());
                $selectedCourses = $availableCourses->random(min($numEnrollments, $availableCourses->count()));

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
        }

        $this->command->info("{$enrollmentCount} new enrollments created!");
        $this->command->info('Total enrollments: ' . DB::table('enrollments')->count());
    }
}
