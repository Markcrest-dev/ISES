import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "ISES has transformed my learning experience. The instant AI feedback helps me understand my mistakes and improve quickly."
    },
    {
      name: "Dr. Michael Chen",
      role: "Professor of Engineering",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      text: "As an instructor, ISES has significantly reduced my grading workload while providing more consistent and detailed feedback to my students."
    },
    {
      name: "Emily Rodriguez",
      role: "Mathematics Student",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      text: "The personalized learning recommendations have helped me focus on areas where I need the most improvement."
    }
  ];

  const faqs = [
    {
      question: "How does the AI evaluation system work?",
      answer: "Our AI system analyzes student submissions using advanced natural language processing and machine learning algorithms. It provides detailed feedback on content, structure, and accuracy while maintaining consistency across evaluations."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security seriously. All submissions are encrypted, and we comply with educational data privacy regulations. Your information is never shared with third parties without consent."
    },
    {
      question: "How accurate is the AI evaluation?",
      answer: "Our AI system maintains a 95% accuracy rate, verified through regular comparisons with human evaluators. All evaluations can be reviewed by instructors if needed."
    },
    {
      question: "Can I integrate ISES with my existing LMS?",
      answer: "Yes, ISES supports integration with major Learning Management Systems including Canvas, Blackboard, and Moodle through standard LTI protocols."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-indigo-600">ISES</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  About
                </a>
                <a href="#features" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Features
                </a>
                <a href="#testimonials" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Testimonials
                </a>
                <a href="#faq" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  FAQ
                </a>
                <a href="#how-it-works" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  How It Works
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <a href="/login" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Sign In
              </a>
              <a href="/signup" className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Transform Student Success with Intelligent Assessment
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-xl text-gray-500">
              AI-powered evaluation platform that provides instant feedback, personalized recommendations, and predictive analytics for better learning outcomes.
            </p>
            <div className="mt-10 flex justify-center">
              <a href="/signup" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700">
                Get Started Free
              </a>
              <a href="#how-it-works" className="ml-4 inline-block bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-50">
                Learn More
              </a>
            </div>
            <div className="mt-8">
              <p className="text-gray-500">
                1000+ Active Students | 95% Satisfaction | 24/7 Availability
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Powerful Features</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Everything you need to enhance the learning experience
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Performance Analytics</h3>
                  </div>
                </div>
                <p className="mt-4 text-base text-gray-500">
                  Track progress with detailed analytics and insights into learning patterns.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">AI-Powered Feedback</h3>
                  </div>
                </div>
                <p className="mt-4 text-base text-gray-500">
                  Receive instant, personalized feedback on assignments and assessments.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Learning Style Analysis</h3>
                  </div>
                </div>
                <p className="mt-4 text-base text-gray-500">
                  Understand individual learning preferences with VARK model analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Simple steps to transform your academic journey
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  1
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">Create Account</h3>
                <p className="mt-2 text-base text-gray-500">
                  Sign up as a student, instructor, or administrator.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  2
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">Submit Assignments</h3>
                <p className="mt-2 text-base text-gray-500">
                  Upload your work directly through the platform.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  3
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">Receive AI Feedback</h3>
                <p className="mt-2 text-base text-gray-500">
                  Get instant, personalized feedback and scoring.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  4
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">Track Progress</h3>
                <p className="mt-2 text-base text-gray-500">
                  Monitor your improvement with detailed analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About ISES
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              ISES is revolutionizing education through intelligent assessment technology.
              Our platform combines AI-powered evaluation with human expertise to provide
              comprehensive feedback and personalized learning paths.
            </p>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Smart Assessment</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Advanced AI algorithms provide instant, detailed feedback on student work.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Personalized Learning</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Customized learning paths based on individual student performance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Data Security</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Enterprise-grade security ensuring your data is safe and protected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <span className="text-2xl font-bold text-white">ISES</span>
              <p className="mt-2 text-gray-400 text-sm">
                Transforming education through intelligent assessment technology.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#about" className="text-base text-gray-300 hover:text-white">About Us</a>
                </li>
                <li>
                  <a href="#features" className="text-base text-gray-300 hover:text-white">Features</a>
                </li>
                <li>
                  <a href="#testimonials" className="text-base text-gray-300 hover:text-white">Testimonials</a>
                </li>
                <li>
                  <a href="#faq" className="text-base text-gray-300 hover:text-white">FAQ</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/privacy" className="text-base text-gray-300 hover:text-white">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms" className="text-base text-gray-300 hover:text-white">Terms of Service</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Connect</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/contact" className="text-base text-gray-300 hover:text-white">Contact Us</Link>
                </li>
                <li>
                  <a href="mailto:support@ises.edu" className="text-base text-gray-300 hover:text-white">Email Support</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; 2025 ISES - Intelligent Student Evaluation System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;