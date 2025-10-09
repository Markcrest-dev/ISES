<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'student_id',
        'instructor_id',
        'evaluation_type',
        'title',
        'description',
        'score',
        'max_score',
        'percentage',
        'grade',
        'feedback',
        'strengths',
        'areas_for_improvement',
        'evaluation_date',
    ];

    protected $casts = [
        'evaluation_date' => 'date',
    ];

    /**
     * Boot method to calculate percentage and grade automatically
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($evaluation) {
            $evaluation->percentage = ($evaluation->score / $evaluation->max_score) * 100;
            $evaluation->grade = static::calculateGrade($evaluation->percentage);
        });

        static::updating(function ($evaluation) {
            $evaluation->percentage = ($evaluation->score / $evaluation->max_score) * 100;
            $evaluation->grade = static::calculateGrade($evaluation->percentage);
        });
    }

    /**
     * Calculate letter grade from percentage
     */
    private static function calculateGrade($percentage)
    {
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

    /**
     * Get the course this evaluation belongs to
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the student being evaluated
     */
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get the instructor who created this evaluation
     */
    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }
}
