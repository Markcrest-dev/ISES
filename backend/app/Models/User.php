<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'password',
        'role',
        'student_id',
        'program',
        'year_of_study',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get courses taught by this instructor
     */
    public function taughtCourses()
    {
        return $this->hasMany(Course::class, 'instructor_id');
    }

    /**
     * Get courses enrolled by this student
     */
    public function enrolledCourses()
    {
        return $this->belongsToMany(Course::class, 'enrollments', 'student_id', 'course_id')
                    ->withPivot('status')
                    ->withTimestamps();
    }

    /**
     * Get evaluations received by this student
     */
    public function evaluationsReceived()
    {
        return $this->hasMany(Evaluation::class, 'student_id');
    }

    /**
     * Get evaluations created by this instructor
     */
    public function evaluationsGiven()
    {
        return $this->hasMany(Evaluation::class, 'instructor_id');
    }
}
