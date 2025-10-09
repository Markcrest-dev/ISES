import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

interface Evaluation {
  id: number;
  title: string;
  description: string;
  evaluation_type: string;
  score: number;
  max_score: number;
  percentage: number;
  grade: string;
  feedback: string;
  strengths: string;
  areas_for_improvement: string;
  evaluation_date: string;
  course: {
    course_code: string;
    course_name: string;
  };
  instructor: {
    full_name: string;
  };
}

const MyEvaluations: React.FC = () => {
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const fetchEvaluations = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get(`${API_URL}/evaluations/student`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvaluations(response.data.evaluations);
    } catch (err) {
      console.error('Error fetching evaluations:', err);
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A' || grade === 'A-') return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    if (grade === 'D') return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      assignment: 'Assignment',
      quiz: 'Quiz',
      midterm: 'Midterm Exam',
      final: 'Final Exam',
      project: 'Project',
      participation: 'Participation'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading evaluations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Evaluations</h2>

          {evaluations.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-4 text-gray-500">No evaluations yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {evaluations.map((evaluation) => (
                <div
                  key={evaluation.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedEvaluation(evaluation)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">{evaluation.title}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(evaluation.grade)}`}>
                          {evaluation.grade}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                          {getTypeLabel(evaluation.evaluation_type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {evaluation.course.course_code} - {evaluation.course.course_name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Instructor: {evaluation.instructor.full_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {evaluation.score}/{evaluation.max_score}
                      </div>
                      <div className="text-sm text-gray-500">
                        {evaluation.percentage.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {new Date(evaluation.evaluation_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Evaluation Detail Modal */}
      {selectedEvaluation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">{selectedEvaluation.title}</h3>
              <button
                onClick={() => setSelectedEvaluation(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-4 space-y-6">
              {/* Score Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Score</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedEvaluation.score}/{selectedEvaluation.max_score}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Percentage</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedEvaluation.percentage.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Grade</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedEvaluation.grade}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {getTypeLabel(selectedEvaluation.evaluation_type)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div>
                <p className="text-sm font-medium text-gray-500">Course</p>
                <p className="text-lg text-gray-900">
                  {selectedEvaluation.course.course_code} - {selectedEvaluation.course.course_name}
                </p>
              </div>

              {/* Description */}
              {selectedEvaluation.description && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                  <p className="text-gray-900">{selectedEvaluation.description}</p>
                </div>
              )}

              {/* Feedback */}
              {selectedEvaluation.feedback && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Feedback</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-gray-900">{selectedEvaluation.feedback}</p>
                  </div>
                </div>
              )}

              {/* Strengths */}
              {selectedEvaluation.strengths && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Strengths</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-gray-900">{selectedEvaluation.strengths}</p>
                  </div>
                </div>
              )}

              {/* Areas for Improvement */}
              {selectedEvaluation.areas_for_improvement && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Areas for Improvement</p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-gray-900">{selectedEvaluation.areas_for_improvement}</p>
                  </div>
                </div>
              )}

              {/* Date and Instructor */}
              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Evaluation Date</p>
                    <p className="text-gray-900">
                      {new Date(selectedEvaluation.evaluation_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Evaluated By</p>
                    <p className="text-gray-900">{selectedEvaluation.instructor.full_name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvaluations;
