import { supabase } from '../lib/supabase';

export interface Assignment {
  id: number;
  course_id: number;
  instructor_id: string;
  title: string;
  description: string;
  total_points: number;
  due_date: string;
  created_at?: string;
  updated_at?: string;
  course?: any;
}

export const assignmentService = {
  getAssignmentsByCourse: async (courseId: number) => {
    const { data, error } = await supabase
      .from('assignments')
      .select('*, course:courses(course_name, course_code)')
      .eq('course_id', courseId)
      .order('due_date', { ascending: true });

    if (error) throw new Error(error.message);
    return data as Assignment[];
  },

  getAssignmentsByInstructor: async (instructorId: string) => {
    const { data, error } = await supabase
      .from('assignments')
      .select('*, course:courses(course_name, course_code)')
      .eq('instructor_id', instructorId)
      .order('due_date', { ascending: true });

    if (error) throw new Error(error.message);
    return data as Assignment[];
  },

  createAssignment: async (assignmentData: Partial<Assignment>) => {
    const { data, error } = await supabase
      .from('assignments')
      .insert(assignmentData)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Assignment;
  },

  deleteAssignment: async (id: number) => {
    const { error } = await supabase
      .from('assignments')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  }
};
