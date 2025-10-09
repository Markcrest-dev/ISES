<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'student_id',
        'status',
    ];

    /**
     * Get the course for this enrollment
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the student for this enrollment
     */
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
