<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    /**
     * Get all courses for the authenticated instructor
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'instructor') {
            $courses = Course::where('instructor_id', $user->id)
                ->with(['students', 'enrollments'])
                ->get();
        } elseif ($user->role === 'student') {
            $courses = $user->enrolledCourses()
                ->with('instructor')
                ->get();
        } else {
            $courses = Course::with(['instructor', 'students'])->get();
        }

        return response()->json(['courses' => $courses], 200);
    }

    /**
     * Create a new course (Instructor only)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_code' => 'required|string|unique:courses|max:50',
            'course_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'semester' => 'required|string|max:50',
            'year' => 'required|integer|min:2020|max:2100',
            'credits' => 'required|integer|min:1|max:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $course = Course::create([
            'course_code' => $request->course_code,
            'course_name' => $request->course_name,
            'description' => $request->description,
            'instructor_id' => $request->user()->id,
            'semester' => $request->semester,
            'year' => $request->year,
            'credits' => $request->credits,
        ]);

        return response()->json([
            'message' => 'Course created successfully',
            'course' => $course
        ], 201);
    }

    /**
     * Get a specific course
     */
    public function show($id)
    {
        $course = Course::with(['instructor', 'students', 'evaluations'])->findOrFail($id);

        return response()->json(['course' => $course], 200);
    }

    /**
     * Get all students available for enrollment (not yet enrolled)
     */
    public function availableStudents($courseId)
    {
        $course = Course::findOrFail($courseId);

        // Get IDs of students already enrolled
        $enrolledStudentIds = $course->students()->pluck('users.id');

        // Get all students not enrolled in this course
        $availableStudents = User::where('role', 'student')
            ->whereNotIn('id', $enrolledStudentIds)
            ->select('id', 'full_name', 'email', 'student_id', 'program')
            ->get();

        return response()->json(['students' => $availableStudents], 200);
    }
}
