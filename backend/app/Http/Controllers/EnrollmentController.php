<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EnrollmentController extends Controller
{
    /**
     * Enroll a student in a course
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|exists:courses,id',
            'student_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if already enrolled
        $existingEnrollment = Enrollment::where('course_id', $request->course_id)
            ->where('student_id', $request->student_id)
            ->first();

        if ($existingEnrollment) {
            return response()->json([
                'message' => 'Student is already enrolled in this course'
            ], 409);
        }

        $enrollment = Enrollment::create([
            'course_id' => $request->course_id,
            'student_id' => $request->student_id,
            'status' => 'active'
        ]);

        $enrollment->load(['student', 'course']);

        return response()->json([
            'message' => 'Student enrolled successfully',
            'enrollment' => $enrollment
        ], 201);
    }

    /**
     * Get all enrollments for a course
     */
    public function index($courseId)
    {
        $course = Course::findOrFail($courseId);

        $enrollments = Enrollment::where('course_id', $courseId)
            ->with('student')
            ->get();

        return response()->json(['enrollments' => $enrollments], 200);
    }

    /**
     * Remove a student from a course
     */
    public function destroy($id)
    {
        $enrollment = Enrollment::findOrFail($id);
        $enrollment->delete();

        return response()->json([
            'message' => 'Student removed from course successfully'
        ], 200);
    }
}
