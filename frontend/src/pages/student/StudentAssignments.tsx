import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { submissionService, Submission } from '../../services/submissionService';
import { courseService, Course } from '../../services/courseService';
import { assignmentService, Assignment } from '../../services/assignmentService';

const StudentAssignments: React.FC = () => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionContent, setSubmissionContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    try {
      // 1. Get student courses
      const courseRes = await courseService.getCourses(user.id, 'student');
      const studentCourses = courseRes.courses;
      setCourses(studentCourses);

      // 2. Get assignments for these courses
      let allAssignments: Assignment[] = [];
      for (const course of studentCourses) {
        const assigns = await assignmentService.getAssignmentsByCourse(course.id);
        allAssignments = [...allAssignments, ...assigns];
      }
      setAssignments(allAssignments);

      // 3. Get student submissions
      const subs = await submissionService.getStudentSubmissions(user.id);
      setSubmissions(subs);
      
    } catch (error) {
      console.error("Failed to load assignments", error);
    }
  };

  const getSubmissionForAssignment = (assignmentId: number) => {
    return submissions.find(s => s.assignment_id === assignmentId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedAssignment) return;
    
    setLoading(true);
    try {
      await submissionService.submitAssignment({
        assignment_id: selectedAssignment.id,
        student_id: user.id,
        submission_content: submissionContent,
        status: 'submitted',
        submitted_at: new Date().toISOString()
      });
      
      setSubmissionContent('');
      setSelectedAssignment(null);
      await loadData(); // Reload to get updated submission status
    } catch (error) {
      console.error("Failed to submit", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">My Assignments</h2>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {assignments.map((assignment) => {
              const submission = getSubmissionForAssignment(assignment.id);
              const isSubmitted = !!submission;
              
              return (
                <li key={assignment.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {assignment.course?.course_code}: {assignment.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          isSubmitted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {isSubmitted ? 'Submitted' : 'Pending'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {assignment.description}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Due on <time dateTime={assignment.due_date}>{new Date(assignment.due_date).toLocaleDateString()}</time>
                        </p>
                      </div>
                    </div>
                    
                    {!isSubmitted && (
                      <div className="mt-4">
                        <button
                          onClick={() => setSelectedAssignment(assignment)}
                          className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded text-sm font-medium hover:bg-indigo-100"
                        >
                          Submit Work
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
            
            {assignments.length === 0 && (
              <li className="px-4 py-8 text-center text-gray-500">
                No assignments found.
              </li>
            )}
          </ul>
        </div>

        {/* Submission Modal/Form */}
        {selectedAssignment && (
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedAssignment(null)}></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Submit Assignment: {selectedAssignment.title}
                    </h3>
                    <div className="mt-4">
                      <form onSubmit={handleSubmit}>
                        <textarea
                          rows={6}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          placeholder="Type or paste your assignment response here..."
                          required
                          value={submissionContent}
                          onChange={(e) => setSubmissionContent(e.target.value)}
                        />
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm disabled:opacity-50"
                          >
                            {loading ? 'Submitting...' : 'Submit'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedAssignment(null)}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentAssignments;
