<?php
// Simple test script to verify user registration fix

echo "Testing user registration fix...\n";

// Test data for a student user
$studentData = [
    'full_name' => 'Test Student',
    'email' => 'test@student.com',
    'password' => 'Password123',
    'role' => 'student',
    'student_id' => 'STU123456',
    'program' => 'Computer Science',
    'year_of_study' => 2
];

// Test data for an instructor user
$instructorData = [
    'full_name' => 'Test Instructor',
    'email' => 'test@instructor.com',
    'password' => 'Password123',
    'role' => 'instructor'
];

echo "Test data prepared.\n";
echo "To test the registration, please use the frontend application or make API calls to /api/auth/register\n";
echo "Example curl command for student registration:\n";
echo "curl -X POST http://localhost:8000/api/auth/register \\\n";
echo "  -H \"Content-Type: application/json\" \\\n";
echo "  -d '" . json_encode($studentData) . "'\n\n";

echo "Example curl command for instructor registration:\n";
echo "curl -X POST http://localhost:8000/api/auth/register \\\n";
echo "  -H \"Content-Type: application/json\" \\\n";
echo "  -d '" . json_encode($instructorData) . "'\n";
?>