import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

const EvaluateStudent: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    student_id: '',
    evaluation_type: 'assignment',
    title: '',
    description: '',
    score: '',
    max_score: '100',
    feedback: '',
    strengths: '',
    areas_for_improvement: '',
    evaluation_date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    // Check for URL parameters
    const courseParam = searchParams.get('course');
    const studentParam = searchParams.get('student');

    if (courseParam) {
      setSelectedCourse(courseParam);
    }

    if (studentParam) {
      setFormData(prev => ({ ...prev, student_id: studentParam }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedCourse) {
      fetchEnrolledStudents(selectedCourse);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);
      const token = localStorage.getItem('auth_token');
      const response = await axios.get(`${API_URL}/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data.courses);
      setError('');
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses. Please refresh the page.');
    } finally {
      setLoadingCourses(false);
    }
  };

  const fetchEnrolledStudents = async (courseId: string) => {
    try {
      setLoadingStudents(true);
      setStudents([]);
      const token = localStorage.getItem('auth_token');
      const response = await axios.get(`${API_URL}/courses/${courseId}/enrollments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const enrolledStudents = response.data.enrollments.map((enrollment: any) => enrollment.student);
      setStudents(enrolledStudents);

      // Clear student selection if previously selected student is not in this course
      if (formData.student_id && !enrolledStudents.find((s: Student) => s.id.toString() === formData.student_id)) {
        setFormData(prev => ({ ...prev, student_id: '' }));
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to load students for this course.');
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!selectedCourse) {
      setError('Please select a course');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      await axios.post(`${API_URL}/evaluations`, {
        course_id: selectedCourse,
        ...formData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess('Evaluation submitted successfully!');

      // Reset form
      setFormData({
        student_id: '',
        evaluation_type: 'assignment',
        title: '',
        description: '',
        score: '',
        max_score: '100',
        feedback: '',
        strengths: '',
        areas_for_improvement: '',
        evaluation_date: new Date().toISOString().split('T')[0]
      });

      setTimeout(() => {
        navigate('/instructor/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit evaluation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Evaluate Student</h2>

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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Course *
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
                disabled={loadingCourses}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              >
                <option value="">
                  {loadingCourses ? '-- Loading courses... --' : '-- Select a course --'}
                </option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_code} - {course.course_name}
                  </option>
                ))}
              </select>
              {courses.length === 0 && !loadingCourses && (
                <p className="mt-1 text-sm text-gray-500">No courses available</p>
              )}
              {courses.length > 0 && !loadingCourses && (
                <p className="mt-1 text-sm text-gray-500">{courses.length} course(s) available</p>
              )}
            </div>

            {/* Student Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Student *
              </label>
              <select
                name="student_id"
                value={formData.student_id}
                onChange={handleChange}
                required
                disabled={!selectedCourse || loadingStudents}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              >
                <option value="">
                  {!selectedCourse
                    ? '-- Select a course first --'
                    : loadingStudents
                    ? '-- Loading students... --'
                    : '-- Select a student --'}
                </option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.full_name} ({student.student_id}) - {student.program}
                  </option>
                ))}
              </select>
              {selectedCourse && students.length === 0 && !loadingStudents && (
                <p className="mt-1 text-sm text-yellow-600">No students enrolled in this course</p>
              )}
              {selectedCourse && students.length > 0 && !loadingStudents && (
                <p className="mt-1 text-sm text-gray-500">{students.length} student(s) enrolled</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Evaluation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evaluation Type *
                </label>
                <select
                  name="evaluation_type"
                  value={formData.evaluation_type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="assignment">Assignment</option>
                  <option value="quiz">Quiz</option>
                  <option value="midterm">Midterm Exam</option>
                  <option value="final">Final Exam</option>
                  <option value="project">Project</option>
                  <option value="participation">Participation</option>
                </select>
              </div>

              {/* Evaluation Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evaluation Date *
                </label>
                <input
                  type="date"
                  name="evaluation_date"
                  value={formData.evaluation_date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Assignment 1 - Data Structures"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Optional description of the evaluation"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Score */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Score Obtained *
                </label>
                <input
                  type="number"
                  name="score"
                  value={formData.score}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="e.g., 85"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Max Score */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Score *
                </label>
                <input
                  type="number"
                  name="max_score"
                  value={formData.max_score}
                  onChange={handleChange}
                  required
                  min="1"
                  step="0.01"
                  placeholder="e.g., 100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Feedback */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                General Feedback
              </label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                rows={4}
                placeholder="Provide general feedback on the student's performance"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Strengths */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Strengths
              </label>
              <textarea
                name="strengths"
                value={formData.strengths}
                onChange={handleChange}
                rows={3}
                placeholder="What did the student do well?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Areas for Improvement */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Areas for Improvement
              </label>
              <textarea
                name="areas_for_improvement"
                value={formData.areas_for_improvement}
                onChange={handleChange}
                rows={3}
                placeholder="What can the student improve on?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/instructor/dashboard')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Evaluation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EvaluateStudent;
