import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { courseService } from '../../services/courseService';

const CreateCourse: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course_code: '',
    course_name: '',
    description: '',
    semester: '',
    year: new Date().getFullYear(),
    credits: 3,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'year' || name === 'credits' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError('');
    
    try {
      await courseService.createCourse(formData, user.id);
      navigate('/instructor/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create New Course</h2>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="course_code" className="block text-sm font-medium text-gray-700">Course Code</label>
            <input
              type="text"
              id="course_code"
              name="course_code"
              required
              value={formData.course_code}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., CS101"
            />
          </div>

          <div>
            <label htmlFor="course_name" className="block text-sm font-medium text-gray-700">Course Name</label>
            <input
              type="text"
              id="course_name"
              name="course_name"
              required
              value={formData.course_name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
              <select
                id="semester"
                name="semester"
                required
                value={formData.semester}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select...</option>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
              <input
                type="number"
                id="year"
                name="year"
                required
                value={formData.year}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="credits" className="block text-sm font-medium text-gray-700">Credits</label>
            <input
              type="number"
              id="credits"
              name="credits"
              required
              min="1"
              max="6"
              value={formData.credits}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/instructor/dashboard')}
              className="flex-1 bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
