<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\EvaluationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Course routes
    Route::get('/courses', [CourseController::class, 'index']);
    Route::post('/courses', [CourseController::class, 'store']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::get('/courses/{id}/available-students', [CourseController::class, 'availableStudents']);

    // Enrollment routes
    Route::post('/enrollments', [EnrollmentController::class, 'store']);
    Route::get('/courses/{courseId}/enrollments', [EnrollmentController::class, 'index']);
    Route::delete('/enrollments/{id}', [EnrollmentController::class, 'destroy']);

    // Evaluation routes
    Route::get('/evaluations/student', [EvaluationController::class, 'studentEvaluations']);
    Route::get('/evaluations/instructor', [EvaluationController::class, 'instructorEvaluations']);
    Route::get('/evaluations/course/{courseId}', [EvaluationController::class, 'courseEvaluations']);
    Route::get('/evaluations/student/{studentId}/summary', [EvaluationController::class, 'studentPerformanceSummary']);
    Route::post('/evaluations', [EvaluationController::class, 'store']);
    Route::put('/evaluations/{id}', [EvaluationController::class, 'update']);
    Route::delete('/evaluations/{id}', [EvaluationController::class, 'destroy']);
});

Route::get('/test', function () {
    return response()->json(['message' => 'Successfully connected to the backend!']);
});
