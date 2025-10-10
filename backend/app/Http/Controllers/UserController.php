<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Evaluation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Get all students with their evaluation statistics
     */
    public function getStudents(Request $request)
    {
        $students = User::where('role', 'student')
            ->withCount('evaluationsReceived')
            ->with(['evaluationsReceived' => function ($query) {
                $query->latest()->limit(1);
            }])
            ->orderBy('full_name')
            ->get();

        // Add additional statistics for each student
        $students->transform(function ($student) {
            $evaluationStats = Evaluation::where('student_id', $student->id)
                ->selectRaw('COUNT(*) as total_evaluations, AVG(percentage) as avg_percentage')
                ->first();

            $student->total_evaluations = $evaluationStats->total_evaluations ?? 0;
            $student->average_grade = $evaluationStats->avg_percentage ?? 0;
            $student->last_evaluation = $student->evaluationsReceived->first();

            unset($student->evaluationsReceived);

            return $student;
        });

        return response()->json(['students' => $students], 200);
    }

    /**
     * Get students enrolled in a specific course with evaluation status
     */
    public function getCourseStudentsWithEvaluations(Request $request, $courseId)
    {
        $students = User::where('role', 'student')
            ->whereHas('enrolledCourses', function ($query) use ($courseId) {
                $query->where('course_id', $courseId);
            })
            ->with(['evaluationsReceived' => function ($query) use ($courseId) {
                $query->where('course_id', $courseId);
            }])
            ->get();

        $students->transform(function ($student) use ($courseId) {
            $courseEvaluations = $student->evaluationsReceived;

            $student->total_evaluations_in_course = $courseEvaluations->count();
            $student->average_grade_in_course = $courseEvaluations->avg('percentage') ?? 0;
            $student->last_evaluation_in_course = $courseEvaluations->sortByDesc('evaluation_date')->first();

            unset($student->evaluationsReceived);

            return $student;
        });

        return response()->json(['students' => $students], 200);
    }

    /**
     * Get all students without any evaluations
     */
    public function getUnevaluatedStudents(Request $request)
    {
        $students = User::where('role', 'student')
            ->doesntHave('evaluationsReceived')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['students' => $students], 200);
    }

    /**
     * Get student details with full evaluation history
     */
    public function getStudentProfile($studentId)
    {
        $student = User::where('role', 'student')
            ->where('id', $studentId)
            ->with(['evaluationsReceived.course', 'evaluationsReceived.instructor', 'enrolledCourses'])
            ->firstOrFail();

        // Calculate overall statistics
        $evaluations = $student->evaluationsReceived;

        $statistics = [
            'total_evaluations' => $evaluations->count(),
            'average_percentage' => round($evaluations->avg('percentage'), 2),
            'average_grade' => $this->calculateAverageGrade($evaluations->avg('percentage')),
            'by_type' => [],
            'by_course' => [],
        ];

        // Group by evaluation type
        $byType = $evaluations->groupBy('evaluation_type');
        foreach ($byType as $type => $typeEvaluations) {
            $statistics['by_type'][$type] = [
                'count' => $typeEvaluations->count(),
                'average' => round($typeEvaluations->avg('percentage'), 2),
            ];
        }

        // Group by course
        $byCourse = $evaluations->groupBy('course_id');
        foreach ($byCourse as $courseId => $courseEvaluations) {
            $course = $courseEvaluations->first()->course;
            $statistics['by_course'][] = [
                'course_code' => $course->course_code,
                'course_name' => $course->course_name,
                'count' => $courseEvaluations->count(),
                'average' => round($courseEvaluations->avg('percentage'), 2),
            ];
        }

        return response()->json([
            'student' => $student,
            'statistics' => $statistics
        ], 200);
    }

    /**
     * Calculate letter grade from percentage
     */
    private function calculateAverageGrade($percentage)
    {
        if (!$percentage) return 'N/A';

        if ($percentage >= 90) return 'A';
        if ($percentage >= 85) return 'A-';
        if ($percentage >= 80) return 'B+';
        if ($percentage >= 75) return 'B';
        if ($percentage >= 70) return 'B-';
        if ($percentage >= 65) return 'C+';
        if ($percentage >= 60) return 'C';
        if ($percentage >= 55) return 'C-';
        if ($percentage >= 50) return 'D';
        return 'F';
    }
}
