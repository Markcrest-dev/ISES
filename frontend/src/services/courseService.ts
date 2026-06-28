import { supabase } from '../lib/supabase';

export interface Course {
  id: number;
  course_code: string;
  course_name: string;
  description?: string;
  instructor_id: string;
  semester: string;
  year: number;
  credits: number;
  created_at?: string;
  updated_at?: string;
  // Joined data
  instructor?: {
    id: string;
    full_name: string;
    email: string;
  };
  students?: any[];
  enrollments?: any[];
}

export interface CreateCourseData {
  course_code: string;
  course_name: string;
  description?: string;
  semester: string;
  year: number;
  credits: number;
}

export const courseService = {
  /**
   * Get courses based on user role.
   * - Instructors: get courses they teach
   * - Students: get courses they're enrolled in
   * - Admins: get all courses
   */
  getCourses: async (userId: string, role: string) => {
    if (role === 'instructor') {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          enrollments(
            id,
            status,
            student:profiles!enrollments_student_id_fkey(id, full_name, email, student_id, program)
          )
        `)
        .eq('instructor_id', userId);

      if (error) throw new Error(error.message);

      // Map enrollments to also provide a students array for compatibility
      const courses = (data || []).map((course: any) => ({
        ...course,
        students: (course.enrollments || []).map((e: any) => e.student),
      }));

      return { courses };
    }

    if (role === 'student') {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          course:courses(
            *,
            instructor:profiles!courses_instructor_id_fkey(id, full_name, email)
          )
        `)
        .eq('student_id', userId);

      if (error) throw new Error(error.message);

      const courses = (data || []).map((e: any) => e.course).filter(Boolean);
      return { courses };
    }

    // Admin: all courses
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        instructor:profiles!courses_instructor_id_fkey(id, full_name, email),
        enrollments(
          id,
          student:profiles!enrollments_student_id_fkey(id, full_name, email)
        )
      `);

    if (error) throw new Error(error.message);

    const courses = (data || []).map((course: any) => ({
      ...course,
      students: (course.enrollments || []).map((e: any) => e.student),
    }));

    return { courses };
  },

  /**
   * Create a new course (instructor only)
   */
  createCourse: async (courseData: CreateCourseData, instructorId: string) => {
    const { data, error } = await supabase
      .from('courses')
      .insert({
        ...courseData,
        instructor_id: instructorId,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return { message: 'Course created successfully', course: data };
  },

  /**
   * Get a specific course by ID with full details
   */
  getCourse: async (id: number) => {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        instructor:profiles!courses_instructor_id_fkey(id, full_name, email),
        enrollments(
          id,
          student:profiles!enrollments_student_id_fkey(id, full_name, email, student_id, program)
        ),
        evaluations(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);

    const course = {
      ...data,
      students: (data.enrollments || []).map((e: any) => e.student),
    };

    return { course };
  },

  /**
   * Get students not enrolled in a specific course
   */
  getAvailableStudents: async (courseId: number) => {
    // Get enrolled student IDs
    const { data: enrollments, error: enrollError } = await supabase
      .from('enrollments')
      .select('student_id')
      .eq('course_id', courseId);

    if (enrollError) throw new Error(enrollError.message);

    const enrolledIds = (enrollments || []).map((e) => e.student_id);

    // Get all students not in the enrolled list
    let query = supabase
      .from('profiles')
      .select('id, full_name, email, student_id, program')
      .eq('role', 'student');

    if (enrolledIds.length > 0) {
      query = query.not('id', 'in', `(${enrolledIds.join(',')})`);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    return { students: data || [] };
  },
};
