<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\User;

class AdditionalCoursesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all instructors
        $instructors = User::where('role', 'instructor')->get();

        if ($instructors->isEmpty()) {
            $this->command->error('No instructors found. Please create instructors first.');
            return;
        }

        $this->command->info('Creating additional courses...');

        $coursesData = [
            // Computer Science Courses
            [
                'course_code' => 'CS102',
                'course_name' => 'Programming Fundamentals',
                'description' => 'Introduction to programming concepts, logic, and problem-solving using modern programming languages.',
                'credits' => 3,
                'semester' => 'Fall',
                'year' => 2024,
            ],
            [
                'course_code' => 'CS202',
                'course_name' => 'Object-Oriented Programming',
                'description' => 'Advanced programming concepts focusing on OOP principles, design patterns, and best practices.',
                'credits' => 4,
                'semester' => 'Spring',
                'year' => 2024,
            ],
            [
                'course_code' => 'CS203',
                'course_name' => 'Discrete Mathematics for CS',
                'description' => 'Mathematical foundations for computer science including logic, sets, graphs, and combinatorics.',
                'credits' => 3,
                'semester' => 'Fall',
                'year' => 2024,
            ],
            [
                'course_code' => 'CS303',
                'course_name' => 'Computer Networks',
                'description' => 'Study of computer networks, protocols, network architecture, and security.',
                'credits' => 3,
                'semester' => 'Spring',
                'year' => 2024,
            ],
            [
                'course_code' => 'CS304',
                'course_name' => 'Operating Systems',
                'description' => 'Principles of operating systems including process management, memory management, and file systems.',
                'credits' => 4,
                'semester' => 'Fall',
                'year' => 2024,
            ],
            [
                'course_code' => 'CS305',
                'course_name' => 'Artificial Intelligence',
                'description' => 'Introduction to AI concepts, machine learning algorithms, and intelligent systems.',
                'credits' => 3,
                'semester' => 'Spring',
                'year' => 2024,
            ],
            [
                'course_code' => 'CS402',
                'course_name' => 'Machine Learning',
                'description' => 'Advanced machine learning techniques, neural networks, and deep learning.',
                'credits' => 4,
                'semester' => 'Fall',
                'year' => 2024,
            ],
            [
                'course_code' => 'CS403',
                'course_name' => 'Mobile App Development',
                'description' => 'Design and development of mobile applications for iOS and Android platforms.',
                'credits' => 3,
                'semester' => 'Spring',
                'year' => 2024,
            ],
            [
                'course_code' => 'CS404',
                'course_name' => 'Cloud Computing',
                'description' => 'Cloud infrastructure, services, deployment models, and cloud-native applications.',
                'credits' => 3,
                'semester' => 'Fall',
                'year' => 2024,
            ],
            [
                'course_code' => 'CS405',
                'course_name' => 'Cybersecurity Fundamentals',
                'description' => 'Security principles, cryptography, network security, and ethical hacking.',
                'credits' => 3,
                'semester' => 'Spring',
                'year' => 2024,
            ],

            // Mathematics Courses
            [
                'course_code' => 'MATH101',
                'course_name' => 'Calculus I',
                'description' => 'Differential calculus, limits, derivatives, and applications.',
                'credits' => 4,
                'semester' => 'Fall',
                'year' => 2024,
            ],
            [
                'course_code' => 'MATH201',
                'course_name' => 'Calculus II',
                'description' => 'Integral calculus, sequences, series, and multivariable calculus.',
                'credits' => 4,
                'semester' => 'Spring',
                'year' => 2024,
            ],
            [
                'course_code' => 'MATH202',
                'course_name' => 'Linear Algebra',
                'description' => 'Vector spaces, matrices, eigenvalues, and linear transformations.',
                'credits' => 3,
                'semester' => 'Fall',
                'year' => 2024,
            ],
            [
                'course_code' => 'MATH301',
                'course_name' => 'Probability and Statistics',
                'description' => 'Probability theory, statistical inference, and data analysis.',
                'credits' => 3,
                'semester' => 'Spring',
                'year' => 2024,
            ],

            // Engineering Courses
            [
                'course_code' => 'ENG101',
                'course_name' => 'Engineering Design',
                'description' => 'Introduction to engineering design process, problem-solving, and project management.',
                'credits' => 3,
                'semester' => 'Fall',
                'year' => 2024,
            ],
            [
                'course_code' => 'ENG201',
                'course_name' => 'Technical Writing',
                'description' => 'Professional writing skills for technical documents, reports, and proposals.',
                'credits' => 3,
                'semester' => 'Spring',
                'year' => 2024,
            ],
            [
                'course_code' => 'ENG301',
                'course_name' => 'Digital Electronics',
                'description' => 'Digital logic circuits, combinational and sequential circuits, and microprocessors.',
                'credits' => 4,
                'semester' => 'Fall',
                'year' => 2024,
            ],

            // Business & Information Systems
            [
                'course_code' => 'BIS101',
                'course_name' => 'Information Systems Management',
                'description' => 'Management of information systems, business processes, and technology integration.',
                'credits' => 3,
                'semester' => 'Fall',
                'year' => 2024,
            ],
            [
                'course_code' => 'BIS201',
                'course_name' => 'Business Analytics',
                'description' => 'Data-driven decision making, business intelligence, and analytics tools.',
                'credits' => 3,
                'semester' => 'Spring',
                'year' => 2024,
            ],
            [
                'course_code' => 'BIS301',
                'course_name' => 'E-Commerce Systems',
                'description' => 'Electronic commerce, online business models, and digital marketing.',
                'credits' => 3,
                'semester' => 'Fall',
                'year' => 2024,
            ],

            // Data Science
            [
                'course_code' => 'DS101',
                'course_name' => 'Introduction to Data Science',
                'description' => 'Data analysis, visualization, and introduction to machine learning.',
                'credits' => 3,
                'semester' => 'Fall',
                'year' => 2024,
            ],
            [
                'course_code' => 'DS201',
                'course_name' => 'Big Data Analytics',
                'description' => 'Processing and analyzing large-scale datasets, distributed computing.',
                'credits' => 4,
                'semester' => 'Spring',
                'year' => 2024,
            ],
            [
                'course_code' => 'DS301',
                'course_name' => 'Data Visualization',
                'description' => 'Techniques and tools for effective data visualization and storytelling.',
                'credits' => 3,
                'semester' => 'Fall',
                'year' => 2024,
            ],
        ];

        $createdCount = 0;

        foreach ($coursesData as $courseData) {
            // Check if course already exists
            $exists = Course::where('course_code', $courseData['course_code'])->exists();

            if (!$exists) {
                Course::create([
                    ...$courseData,
                    'instructor_id' => $instructors->random()->id,
                ]);
                $createdCount++;
            }
        }

        $this->command->info("{$createdCount} new courses created successfully!");
        $this->command->info('Total courses in database: ' . Course::count());
    }
}
