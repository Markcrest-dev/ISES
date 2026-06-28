import { supabase } from '../lib/supabase';

function calculateAverageGrade(percentage: number | null): string {
  if (!percentage) return 'N/A';
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

export const userService = {
  /**
   * Get all students with evaluation statistics
   */
  getStudents: async () => {
    const { data: students, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'student')
      .order('full_name');

    if (error) throw new Error(error.message);

    // Fetch evaluation stats for each student
    const enriched = await Promise.all(
      (students || []).map(async (student) => {
        const { data: evals } = await supabase
          .from('evaluations')
          .select('id, percentage, evaluation_date')
          .eq('student_id', student.id)
          .order('evaluation_date', { ascending: false });

        const evalList = evals || [];
        const totalEvaluations = evalList.length;
        const avgPercentage =
          totalEvaluations > 0
            ? evalList.reduce((sum, e) => sum + (e.percentage || 0), 0) / totalEvaluations
            : 0;

        return {
          ...student,
          total_evaluations: totalEvaluations,
          average_grade: avgPercentage,
          evaluations_received_count: totalEvaluations,
          last_evaluation: evalList[0] || null,
        };
      })
    );

    return { students: enriched };
  },

  /**
   * Get students enrolled in a specific course with evaluation status
   */
  getCourseStudentsWithEvaluations: async (courseId: number) => {
    // Get enrolled students
    const { data: enrollments, error } = await supabase
      .from('enrollments')
      .select(`
        student:profiles!enrollments_student_id_fkey(*)
      `)
      .eq('course_id', courseId);

    if (error) throw new Error(error.message);

    const students = (enrollments || []).map((e: any) => e.student).filter(Boolean);

    // Enrich with course-specific evaluation data
    const enriched = await Promise.all(
      students.map(async (student: any) => {
        const { data: evals } = await supabase
          .from('evaluations')
          .select('*')
          .eq('student_id', student.id)
          .eq('course_id', courseId)
          .order('evaluation_date', { ascending: false });

        const evalList = evals || [];
        const avgPct =
          evalList.length > 0
            ? evalList.reduce((s, e) => s + (e.percentage || 0), 0) / evalList.length
            : 0;

        return {
          ...student,
          total_evaluations_in_course: evalList.length,
          average_grade_in_course: avgPct,
          last_evaluation_in_course: evalList[0] || null,
        };
      })
    );

    return { students: enriched };
  },

  /**
   * Get students with no evaluations
   */
  getUnevaluatedStudents: async () => {
    const { data: students, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'student')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    // Filter to only those with zero evaluations
    const unevaluated = await Promise.all(
      (students || []).map(async (student) => {
        const { count } = await supabase
          .from('evaluations')
          .select('id', { count: 'exact', head: true })
          .eq('student_id', student.id);
        return { student, count: count || 0 };
      })
    );

    return {
      students: unevaluated.filter((s) => s.count === 0).map((s) => s.student),
    };
  },

  /**
   * Get full student profile with evaluation history
   */
  getStudentProfile: async (studentId: string) => {
    const { data: student, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', studentId)
      .eq('role', 'student')
      .single();

    if (error) throw new Error('Student not found');

    // Get evaluations with course and instructor info
    const { data: evaluations } = await supabase
      .from('evaluations')
      .select(`
        *,
        course:courses(id, course_code, course_name),
        instructor:profiles!evaluations_instructor_id_fkey(id, full_name, email)
      `)
      .eq('student_id', studentId);

    // Get enrolled courses
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('course:courses(*)')
      .eq('student_id', studentId);

    const enrolledCourses = (enrollments || []).map((e: any) => e.course).filter(Boolean);
    const evals = evaluations || [];

    // Calculate statistics
    const avgPct =
      evals.length > 0
        ? evals.reduce((s, e) => s + (e.percentage || 0), 0) / evals.length
        : 0;

    const byType: Record<string, { count: number; average: number }> = {};
    evals.forEach((e) => {
      if (!byType[e.evaluation_type]) byType[e.evaluation_type] = { count: 0, average: 0 };
      byType[e.evaluation_type].count += 1;
    });
    Object.keys(byType).forEach((t) => {
      const te = evals.filter((e) => e.evaluation_type === t);
      byType[t].average = te.reduce((s, e) => s + (e.percentage || 0), 0) / te.length;
    });

    const courseMap: Record<number, any[]> = {};
    evals.forEach((e) => {
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
      student: {
        ...student,
        evaluationsReceived: evals,
        enrolledCourses,
      },
      statistics: {
        total_evaluations: evals.length,
        average_percentage: Math.round(avgPct * 100) / 100,
        average_grade: calculateAverageGrade(avgPct),
        by_type: byType,
        by_course: byCourse,
      },
    };
  },
};
