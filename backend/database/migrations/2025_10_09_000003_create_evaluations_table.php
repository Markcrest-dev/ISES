<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('instructor_id')->constrained('users')->onDelete('cascade');
            $table->string('evaluation_type'); // midterm, final, assignment, quiz, project
            $table->string('title');
            $table->text('description')->nullable();
            $table->decimal('score', 5, 2); // Score obtained
            $table->decimal('max_score', 5, 2)->default(100); // Maximum possible score
            $table->decimal('percentage', 5, 2); // Calculated percentage
            $table->string('grade')->nullable(); // Letter grade (A, B+, etc.)
            $table->text('feedback')->nullable();
            $table->text('strengths')->nullable();
            $table->text('areas_for_improvement')->nullable();
            $table->date('evaluation_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};
