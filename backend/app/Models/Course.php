<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_code',
        'course_name',
        'description',
        'instructor_id',
        'semester',
        'year',
        'credits',
    ];

    /**
     * Get the instructor who teaches this course
     */
    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    /**
     * Get all enrollments for this course
     */
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    /**
     * Get all students enrolled in this course
     */
    public function students()
    {
        return $this->belongsToMany(User::class, 'enrollments', 'course_id', 'student_id')
                    ->withPivot('status')
                    ->withTimestamps();
    }

    /**
     * Get all evaluations for this course
     */
    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }
}
