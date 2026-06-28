import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { assignmentService, Assignment } from '../../services/assignmentService';
import { courseService, Course } from '../../services/courseService';
import { aiService } from '../../services/aiService';
import { submissionService, Submission } from '../../services/submissionService';

const ManageAssignments: React.FC = () => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    course_id: '',
    title: '',
    description: '',
    total_points: 100,
    due_date: ''
  });

  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [assignmentSubmissions, setAssignmentSubmissions] = useState<Submission[]>([]);
  const [evaluatingId, setEvaluatingId] = useState<number | null>(null);

  const viewSubmissions = async (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    try {
      const subs = await submissionService.getSubmissionsByAssignment(assignment.id);
      setAssignmentSubmissions(subs);
    } catch (error) {
      console.error("Failed to load submissions", error);
    }
  };

  const handleEvaluate = async (submissionId: number) => {
    setEvaluatingId(submissionId);
    try {
      await aiService.triggerEvaluation(submissionId);
      // Reload submissions
      if (selectedAssignment) {
        const subs = await submissionService.getSubmissionsByAssignment(selectedAssignment.id);
        setAssignmentSubmissions(subs);
      }
    } catch (error) {
      console.error("Evaluation failed", error);
      alert("Evaluation failed. See console for details.");
    } finally {
      setEvaluatingId(null);
    }
  };

  useEffect(() => {
    if (user) {
      loadInitialData();
    }
  }, [user]);

  const loadInitialData = async () => {
    if (!user) return;
    try {
      const courseRes = await courseService.getCourses(user.id, 'instructor');
      setCourses(courseRes.courses);
      
      const assignmentRes = await assignmentService.getAssignmentsByInstructor(user.id);
      setAssignments(assignmentRes);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.course_id) return;
    setLoading(true);
    try {
      await assignmentService.createAssignment({
        course_id: parseInt(formData.course_id),
        instructor_id: user.id,
        title: formData.title,
        description: formData.description,
        total_points: Number(formData.total_points),
        due_date: new Date(formData.due_date).toISOString()
      });
      
      // Reset form
      setFormData({
        course_id: '',
        title: '',
        description: '',
        total_points: 100,
        due_date: ''
      });
      
      // Reload assignments
      await loadInitialData();
    } catch (error) {
      console.error("Failed to create assignment", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Create Assignment Form */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Create New Assignment</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Course</label>
                  <select 
                    name="course_id" 
                    value={formData.course_id} 
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select a Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.course_code} - {course.course_name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    required 
                    value={formData.title} 
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  name="description" 
                  rows={3} 
                  required 
                  value={formData.description} 
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Points</label>
                  <input 
                    type="number" 
                    name="total_points" 
                    required 
                    min="1"
                    value={formData.total_points} 
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <input 
                    type="datetime-local" 
                    name="due_date" 
                    required 
                    value={formData.due_date} 
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Existing Assignments */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Existing Assignments</h3>
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {assignments.map((assignment) => (
                          <tr key={assignment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {assignment.course?.course_code}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {assignment.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(assignment.due_date).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {assignment.total_points}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button onClick={() => viewSubmissions(assignment)} className="text-indigo-600 hover:text-indigo-900">
                                View Submissions
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submissions Modal */}
        {selectedAssignment && (
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedAssignment(null)}></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Submissions for: {selectedAssignment.title}
                    </h3>
                    <div className="mt-4">
                      {assignmentSubmissions.length === 0 ? (
                        <p className="text-sm text-gray-500">No submissions yet.</p>
                      ) : (
                        <ul className="divide-y divide-gray-200">
                          {assignmentSubmissions.map((sub) => (
                            <li key={sub.id} className="py-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{sub.student?.full_name}</p>
                                  <p className="text-sm text-gray-500">Submitted at: {new Date(sub.submitted_at).toLocaleString()}</p>
                                  <p className="text-sm text-gray-500 mt-2 p-3 bg-gray-50 rounded border break-words whitespace-pre-wrap">{sub.submission_content}</p>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  {sub.status === 'graded' ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      Graded
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => handleEvaluate(sub.id)}
                                      disabled={evaluatingId === sub.id}
                                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                      {evaluatingId === sub.id ? 'Grading...' : 'Grade with AI'}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => setSelectedAssignment(null)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageAssignments;
