# Student Evaluation System - Setup Guide

## Overview
This system allows instructors to evaluate students and for students to view their evaluations in real-time.

## Features Created

### Backend (Laravel)
1. **Database Migrations**
   - `courses` table - stores course information
   - `enrollments` table - manages student course enrollments
   - `evaluations` table - stores student evaluations with scores, grades, and feedback

2. **Models**
   - `Course` - Course model with relationships
   - `Enrollment` - Enrollment model
   - `Evaluation` - Evaluation model with automatic grade calculation
   - Updated `User` model with evaluation relationships

3. **Controllers**
   - `CourseController` - Manage courses
   - `EnrollmentController` - Manage student enrollments
   - `EvaluationController` - Create and manage evaluations

4. **API Endpoints**
   - GET `/api/courses` - Get all courses
   - POST `/api/courses` - Create new course
   - GET `/api/courses/{id}/available-students` - Get students not enrolled
   - POST `/api/enrollments` - Enroll student in course
   - GET `/api/courses/{courseId}/enrollments` - Get enrolled students
   - POST `/api/evaluations` - Create evaluation
   - GET `/api/evaluations/student` - Get student's evaluations
   - GET `/api/evaluations/instructor` - Get instructor's evaluations

### Frontend (React + TypeScript)
1. **Instructor Pages**
   - `ManageStudents.tsx` - Add/remove students from courses
   - `EvaluateStudent.tsx` - Create evaluations for students
   - Updated `InstructorDashboard.tsx` - Added navigation buttons

2. **Student Pages**
   - `MyEvaluations.tsx` - View all evaluations with detailed feedback
   - Updated `StudentDashboard.tsx` - Added "My Evaluations" button

3. **Routing**
   - `/instructor/manage-students` - Manage student enrollments
   - `/instructor/evaluate` - Evaluate students
   - `/student/evaluations` - View evaluations

## Installation Steps

### 1. Run Database Migrations

```bash
cd backend
php artisan migrate
```

This will create the following tables:
- `courses`
- `enrollments`
- `evaluations`

### 2. (Optional) Seed Sample Data

Create a course and enroll some students for testing:

```bash
# Access Laravel Tinker
php artisan tinker

# Create a sample course
$course = \App\Models\Course::create([
    'course_code' => 'CS101',
    'course_name' => 'Introduction to Programming',
    'description' => 'Learn the basics of programming',
    'instructor_id' => 1, // Replace with actual instructor ID
    'semester' => 'Fall 2025',
    'year' => 2025,
    'credits' => 3
]);

# Enroll a student
\App\Models\Enrollment::create([
    'course_id' => $course->id,
    'student_id' => 2, // Replace with actual student ID
    'status' => 'active'
]);
```

### 3. Restart Backend Server

If running locally:
```bash
php artisan serve
```

### 4. Restart Frontend

If the frontend is running, refresh the page to load new routes.

## Usage Flow

### For Instructors:

1. **Login** as instructor
2. **Navigate to Dashboard**
3. **Click "Manage Students"**
   - Select a course
   - Add students to the course
   - View enrolled students

4. **Click "Evaluate Student"**
   - Select a course
   - Select a student from enrolled students
   - Fill in evaluation details:
     - Evaluation type (Assignment, Quiz, Midterm, Final, Project, Participation)
     - Title and description
     - Score and max score (grade is calculated automatically)
     - Feedback, strengths, areas for improvement
   - Submit evaluation

### For Students:

1. **Login** as student
2. **Navigate to Dashboard**
3. **Click "My Evaluations"**
   - View all evaluations in a list
   - Click on any evaluation to see detailed feedback
   - See scores, grades, feedback, strengths, and areas for improvement

## Evaluation Grading System

Grades are automatically calculated based on percentage:
- **A**: 90% and above
- **A-**: 85-89%
- **B+**: 80-84%
- **B**: 75-79%
- **B-**: 70-74%
- **C+**: 65-69%
- **C**: 60-64%
- **C-**: 55-59%
- **D**: 50-54%
- **F**: Below 50%

## API Testing

You can test the API endpoints using curl or Postman:

### Create an Evaluation
```bash
curl -X POST http://localhost:8000/api/evaluations \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "course_id": 1,
    "student_id": 2,
    "evaluation_type": "assignment",
    "title": "Assignment 1",
    "description": "First programming assignment",
    "score": 85,
    "max_score": 100,
    "feedback": "Great work on this assignment!",
    "strengths": "Excellent code structure and logic",
    "areas_for_improvement": "Could improve code comments",
    "evaluation_date": "2025-10-09"
  }'
```

### Get Student Evaluations
```bash
curl -X GET http://localhost:8000/api/evaluations/student \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Troubleshooting

### Migration Issues
If migrations fail, check:
1. Database connection in `.env` file
2. Database exists and is accessible
3. Run `php artisan config:clear` before migrating

### Token Issues
If getting 401 Unauthorized:
1. Ensure you're logged in
2. Check token in localStorage
3. Token should be in format: `Bearer {token}`

### CORS Issues
If frontend can't connect to backend:
1. Check `backend/config/cors.php`
2. Ensure `FRONTEND_URL` is set in `.env`
3. Restart backend server

## Database Schema

### courses
- id, course_code, course_name, description, instructor_id, semester, year, credits

### enrollments
- id, course_id, student_id, status (active/completed/dropped)

### evaluations
- id, course_id, student_id, instructor_id, evaluation_type, title, description
- score, max_score, percentage, grade
- feedback, strengths, areas_for_improvement, evaluation_date

## Next Steps

1. ✅ Run migrations
2. ✅ Create courses for instructors
3. ✅ Enroll students in courses
4. ✅ Create evaluations
5. ✅ Students view their evaluations

## Support

If you encounter any issues, check:
- Laravel logs: `backend/storage/logs/laravel.log`
- Browser console for frontend errors
- Network tab for API request/response details
