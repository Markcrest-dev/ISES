import { supabase } from '../lib/supabase';

export interface Submission {
  id: number;
  assignment_id: number;
  student_id: string;
  submission_content: string;
  status: 'draft' | 'submitted' | 'graded';
  submitted_at: string;
  assignment?: any;
  student?: any;
}

export const submissionService = {
  getSubmissionsByAssignment: async (assignmentId: number) => {
    const { data, error } = await supabase
      .from('submissions')
      .select('*, student:profiles(id, full_name, email)')
      .eq('assignment_id', assignmentId)
      .order('submitted_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data as Submission[];
  },

  getStudentSubmissions: async (studentId: string) => {
    const { data, error } = await supabase
      .from('submissions')
      .select('*, assignment:assignments(*, course:courses(course_name, course_code))')
      .eq('student_id', studentId)
      .order('submitted_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data as Submission[];
  },

  submitAssignment: async (submissionData: Partial<Submission>) => {
    const { data, error } = await supabase
      .from('submissions')
      .upsert(submissionData, { onConflict: 'assignment_id,student_id' })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Submission;
  }
};
