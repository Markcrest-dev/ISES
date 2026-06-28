import { supabase } from '../lib/supabase';

export interface Enrollment {
  id: number;
  course_id: number;
  student_id: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  student?: {
    id: string;
    full_name: string;
    email: string;
    student_id?: string;
    program?: string;
  };
  course?: {
    id: number;
    course_code: string;
    course_name: string;
  };
}

export const enrollmentService = {
  /**
   * Enroll a student in a course
   */
  enrollStudent: async (courseId: number, studentId: string) => {
    // Check if already enrolled
    const { data: existing } = await supabase
      .from('enrollments')
      .select('id')
      .eq('course_id', courseId)
      .eq('student_id', studentId)
      .maybeSingle();

    if (existing) {
      throw new Error('Student is already enrolled in this course');
    }

    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        course_id: courseId,
        student_id: studentId,
        status: 'active',
      })
      .select(`
        *,
        student:profiles!enrollments_student_id_fkey(id, full_name, email, student_id, program),
        course:courses(id, course_code, course_name)
      `)
      .single();

    if (error) throw new Error(error.message);

    return { message: 'Student enrolled successfully', enrollment: data };
  },

  /**
   * Get all enrollments for a course
   */
  getCourseEnrollments: async (courseId: number) => {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        student:profiles!enrollments_student_id_fkey(id, full_name, email, student_id, program, year_of_study)
      `)
      .eq('course_id', courseId);

    if (error) throw new Error(error.message);

    return { enrollments: data || [] };
  },

  /**
   * Remove a student from a course (delete enrollment)
   */
  removeEnrollment: async (enrollmentId: number) => {
    const { error } = await supabase
      .from('enrollments')
      .delete()
      .eq('id', enrollmentId);

    if (error) throw new Error(error.message);

    return { message: 'Student removed from course successfully' };
  },
};
