import { supabase } from '../lib/supabase';

function calculateGrade(percentage: number): string {
  if (percentage >= 90) return 'A';
  if (percentage >= 85) return 'A-';
  if (percentage >= 80) return 'B+';
  if (percentage >= 75) return 'B';
  if (percentage >= 70) return 'B-';
  if (percentage >= 65) return 'C+';
  if (percentage >= 60) return 'C';
  if (percentage >= 55) return 'C-';
  if (percentage >= 50) return 'D';
  return 'F';
}

export interface Evaluation {
  id: number;
  course_id: number;
  student_id: string;
  instructor_id: string;
  evaluation_type: string;
  title: string;
  description?: string;
  score: number;
  max_score: number;
  percentage: number;
  grade?: string;
  feedback?: string;
  strengths?: string;
  areas_for_improvement?: string;
  evaluation_date: string;
  course?: any;
  student?: any;
  instructor?: any;
}

export interface CreateEvaluationData {
  course_id: number;
  student_id: string;
  evaluation_type: string;
  title: string;
  description?: string;
  score: number;
  max_score: number;
  feedback?: string;
  strengths?: string;
  areas_for_improvement?: string;
  evaluation_date: string;
}

const EVAL_WITH_COURSE_STUDENT = `
  *,
  course:courses(id, course_code, course_name),
  student:profiles!evaluations_student_id_fkey(id, full_name, email, student_id)
`;

const EVAL_WITH_COURSE_INSTRUCTOR = `
  *,
  course:courses(id, course_code, course_name),
  instructor:profiles!evaluations_instructor_id_fkey(id, full_name, email)
`;

const EVAL_WITH_ALL = `
  *,
  course:courses(id, course_code, course_name),
  student:profiles!evaluations_student_id_fkey(id, full_name, email, student_id),
  instructor:profiles!evaluations_instructor_id_fkey(id, full_name, email)
`;

export const evaluationService = {
  getStudentEvaluations: async (studentId: string) => {
    const { data, error } = await supabase
      .from('evaluations')
      .select(EVAL_WITH_COURSE_INSTRUCTOR)
      .eq('student_id', studentId)
      .order('evaluation_date', { ascending: false });
    if (error) throw new Error(error.message);
    return { evaluations: data || [] };
  },

  getInstructorEvaluations: async (instructorId: string) => {
    const { data, error } = await supabase
      .from('evaluations')
      .select(EVAL_WITH_COURSE_STUDENT)
      .eq('instructor_id', instructorId)
      .order('evaluation_date', { ascending: false });
    if (error) throw new Error(error.message);
    return { evaluations: data || [] };
  },

  getCourseEvaluations: async (courseId: number) => {
    const { data, error } = await supabase
      .from('evaluations')
      .select(EVAL_WITH_ALL)
      .eq('course_id', courseId)
      .order('evaluation_date', { ascending: false });
    if (error) throw new Error(error.message);
    return { evaluations: data || [] };
  },

  createEvaluation: async (evalData: CreateEvaluationData, instructorId: string) => {
    if (evalData.score > evalData.max_score) {
      throw new Error('Score cannot exceed maximum score');
    }
    const percentage = (evalData.score / evalData.max_score) * 100;
    const grade = calculateGrade(percentage);

    const { data, error } = await supabase
      .from('evaluations')
      .insert({
        ...evalData,
        instructor_id: instructorId,
        percentage: Math.round(percentage * 100) / 100,
        grade,
      })
      .select(EVAL_WITH_COURSE_STUDENT)
      .single();
    if (error) throw new Error(error.message);
    return { message: 'Evaluation created successfully', evaluation: data };
  },

  updateEvaluation: async (id: number, updates: Partial<CreateEvaluationData>) => {
    const updatePayload: Record<string, any> = { ...updates };

    if (updates.score !== undefined || updates.max_score !== undefined) {
      const { data: current } = await supabase
        .from('evaluations')
        .select('score, max_score')
        .eq('id', id)
        .single();
      if (current) {
        const score = updates.score ?? current.score;
        const maxScore = updates.max_score ?? current.max_score;
        const pct = (score / maxScore) * 100;
        updatePayload.percentage = Math.round(pct * 100) / 100;
        updatePayload.grade = calculateGrade(pct);
      }
    }

    const { data, error } = await supabase
      .from('evaluations')
      .update(updatePayload)
      .eq('id', id)
      .select(EVAL_WITH_COURSE_STUDENT)
      .single();
    if (error) throw new Error(error.message);
    return { message: 'Evaluation updated successfully', evaluation: data };
  },

  deleteEvaluation: async (id: number) => {
    const { error } = await supabase
      .from('evaluations')
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);
    return { message: 'Evaluation deleted successfully' };
  },

  getPerformanceSummary: async (studentId: string) => {
    const { data: evals, error } = await supabase
      .from('evaluations')
      .select('*, course:courses(id, course_code, course_name)')
      .eq('student_id', studentId);
    if (error) throw new Error(error.message);

    const list = evals || [];
    const total = list.length;
    const avgPct = total > 0
      ? list.reduce((s, e) => s + (e.percentage || 0), 0) / total
      : 0;

    const byType: Record<string, { count: number; average: number }> = {};
    list.forEach((e) => {
      if (!byType[e.evaluation_type]) byType[e.evaluation_type] = { count: 0, average: 0 };
      byType[e.evaluation_type].count += 1;
    });
    Object.keys(byType).forEach((t) => {
      const te = list.filter((e) => e.evaluation_type === t);
      byType[t].average = te.reduce((s, e) => s + (e.percentage || 0), 0) / te.length;
    });

    const courseMap: Record<number, any[]> = {};
    list.forEach((e) => {
      if (!courseMap[e.course_id]) courseMap[e.course_id] = [];
      courseMap[e.course_id].push(e);
    });
    const byCourse = Object.values(courseMap).map((ce) => ({
      course_code: ce[0].course?.course_code || '',
      course_name: ce[0].course?.course_name || '',
      count: ce.length,
      average: ce.reduce((s, e) => s + (e.percentage || 0), 0) / ce.length,
    }));

    return {
      summary: {
        total_evaluations: total,
        average_percentage: Math.round(avgPct * 100) / 100,
        by_type: byType,
        by_course: byCourse,
      },
    };
  },
};
