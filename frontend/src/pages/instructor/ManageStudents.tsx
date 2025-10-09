import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

interface Course {
  id: number;
  course_code: string;
  course_name: string;
}

interface Student {
  id: number;
  full_name: string;
  email: string;
  student_id: string;
  program: string;
}

interface Enrollment {
  id: number;
  student: Student;
}

const ManageStudents: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [enrolledStudents, setEnrolledStudents] = useState<Enrollment[]>([]);
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchEnrolledStudents();
      fetchAvailableStudents();
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get(`${API_URL}/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data.courses);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const fetchEnrolledStudents = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get(`${API_URL}/courses/${selectedCourse}/enrollments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnrolledStudents(response.data.enrollments);
    } catch (err) {
      console.error('Error fetching enrolled students:', err);
    }
  };

  const fetchAvailableStudents = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get(`${API_URL}/courses/${selectedCourse}/available-students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAvailableStudents(response.data.students);
    } catch (err) {
      console.error('Error fetching available students:', err);
    }
  };

  const handleAddStudent = async () => {
    if (!selectedStudent) {
      setError('Please select a student');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('auth_token');
      await axios.post(`${API_URL}/enrollments`, {
        course_id: selectedCourse,
        student_id: selectedStudent
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess('Student added successfully!');
      setShowAddModal(false);
      setSelectedStudent('');
      fetchEnrolledStudents();
      fetchAvailableStudents();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveStudent = async (enrollmentId: number) => {
    if (!window.confirm('Are you sure you want to remove this student?')) {
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(`${API_URL}/enrollments/${enrollmentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess('Student removed successfully!');
      fetchEnrolledStudents();
      fetchAvailableStudents();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to remove student');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/instructor/dashboard')}
            className="text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Students</h2>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          {/* Course Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Select a course --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_code} - {course.course_name}
                </option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Enrolled Students ({enrolledStudents.length})
                </h3>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  + Add Student
                </button>
              </div>

              {/* Enrolled Students Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Program
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {enrolledStudents.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No students enrolled yet
                        </td>
                      </tr>
                    ) : (
                      enrolledStudents.map((enrollment) => (
                        <tr key={enrollment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {enrollment.student.student_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {enrollment.student.full_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {enrollment.student.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {enrollment.student.program}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleRemoveStudent(enrollment.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Add Student Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Student to Course</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Student
                </label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">-- Select a student --</option>
                  {availableStudents.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.full_name} ({student.student_id}) - {student.program}
                    </option>
                  ))}
                </select>
              </div>

              {availableStudents.length === 0 && (
                <p className="text-sm text-gray-500 mb-4">
                  No available students to add. All students are already enrolled.
                </p>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedStudent('');
                    setError('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStudent}
                  disabled={loading || !selectedStudent}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Student'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStudents;
