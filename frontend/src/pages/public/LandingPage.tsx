import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const LandingPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "ISES has transformed my learning experience. The instant AI feedback helps me understand my mistakes and improve quickly.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Professor of Engineering",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      text: "As an instructor, ISES has significantly reduced my grading workload while providing more consistent and detailed feedback to my students.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Mathematics Student",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      text: "The personalized learning recommendations have helped me focus on areas where I need the most improvement.",
      rating: 5
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-900">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-dark-bg-secondary dark:via-dark-bg-tertiary dark:to-dark-900 pt-20">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.02] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,#0a0e27,rgba(10,14,39,0.6))]"></div>
        <div className="max-w-7xl mx-auto py-20 px-4 sm:py-32 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 mb-8 animate-pulse">
                🚀 Transform Your Learning Experience
              </span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl sm:tracking-tight lg:text-7xl">
              <span className="block">Intelligent Student</span>
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Evaluation System</span>
            </h1>
            <p className="mt-8 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              AI-powered evaluation platform that provides instant feedback, personalized recommendations, and predictive analytics for better learning outcomes.
            </p>
            <div className="mt-12 flex justify-center gap-4">
              <a href="/signup" className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-blue-600 dark:to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl dark:hover:shadow-blue-900/50 transform hover:-translate-y-1 transition-all duration-200">
                <span>Get Started Free</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#how-it-works" className="inline-flex items-center px-8 py-4 bg-white dark:bg-dark-bg-tertiary text-indigo-600 dark:text-blue-400 border-2 border-indigo-600 dark:border-blue-500 text-lg font-semibold rounded-xl hover:bg-indigo-50 dark:hover:bg-dark-bg-hover transform hover:-translate-y-1 transition-all duration-200">
                Learn More
              </a>
            </div>
            <div className="mt-12 flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300 font-medium">1000+ Active Students</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300 font-medium">95% Satisfaction</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300 font-medium">24/7 Availability</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-dark-bg-primary to-transparent"></div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white dark:bg-dark-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-indigo-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wide">Features</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">Powerful Features for Modern Learning</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
              Everything you need to enhance the learning experience
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  ),
                  title: "Performance Analytics",
                  description: "Track progress with detailed analytics and insights into learning patterns.",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  ),
                  title: "AI-Powered Feedback",
                  description: "Receive instant, personalized feedback on assignments and assessments.",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  ),
                  title: "Learning Style Analysis",
                  description: "Understand individual learning preferences with VARK model analysis.",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  ),
                  title: "Instant Grading",
                  description: "Get immediate results with our advanced AI grading system.",
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  ),
                  title: "Personalized Learning",
                  description: "Customized learning paths based on individual student performance.",
                  gradient: "from-indigo-500 to-blue-500"
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  ),
                  title: "Data Security",
                  description: "Enterprise-grade security ensuring your data is safe and protected.",
                  gradient: "from-yellow-500 to-orange-500"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-dark-bg-secondary p-8 rounded-2xl shadow-md dark:shadow-black/30 hover:shadow-2xl dark:hover:shadow-blue-900/50 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-dark-bg-hover"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 dark:text-blue-400 font-medium">
                    <span className="text-sm">Learn more</span>
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-dark-bg-secondary dark:via-dark-bg-tertiary dark:to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-indigo-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wide">Process</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">How It Works</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
              Simple steps to transform your academic journey
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "1", title: "Create Account", description: "Sign up as a student, instructor, or administrator.", color: "blue" },
                { step: "2", title: "Submit Assignments", description: "Upload your work directly through the platform.", color: "purple" },
                { step: "3", title: "Receive AI Feedback", description: "Get instant, personalized feedback and scoring.", color: "pink" },
                { step: "4", title: "Track Progress", description: "Monitor your improvement with detailed analytics.", color: "indigo" }
              ].map((item, index) => (
                <div key={index} className="relative text-center">
                  <div className="flex flex-col items-center">
                    <div className={`flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 text-white text-2xl font-bold shadow-xl transform hover:scale-110 transition-transform duration-300`}>
                      {item.step}
                    </div>
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-blue-800 dark:to-purple-800"></div>
                    )}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="bg-white dark:bg-dark-bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-indigo-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wide">Testimonials</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">What Our Users Say</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
              Join thousands of satisfied students and educators
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group bg-gradient-to-br from-white to-indigo-50 dark:from-dark-bg-secondary dark:to-dark-bg-tertiary rounded-2xl shadow-md dark:shadow-black/30 hover:shadow-2xl dark:hover:shadow-blue-900/50 p-8 transition-all duration-300 transform hover:-translate-y-2 border border-indigo-100 dark:border-dark-bg-hover">
                <div className="flex items-center mb-6">
                  <img
                    className="h-14 w-14 rounded-full ring-4 ring-indigo-100 dark:ring-blue-900"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-dark-bg-secondary dark:to-dark-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-indigo-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wide">FAQ</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="mt-16 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-dark-bg-tertiary rounded-xl shadow-md dark:shadow-black/30 hover:shadow-lg dark:hover:shadow-blue-900/30 transition-shadow duration-300 overflow-hidden">
                <button
                  className="w-full text-left px-8 py-6 focus:outline-none"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                    <svg
                      className={`w-6 h-6 text-indigo-600 dark:text-blue-400 transform transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div
                    className={`mt-4 text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-300 ${activeIndex === index ? 'block' : 'hidden'}`}
                  >
                    {faq.answer}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-blue-700 dark:to-purple-800 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-white">
            Ready to Transform Your Learning?
          </h2>
          <p className="mt-4 text-xl text-indigo-100 dark:text-blue-100">
            Join thousands of students and educators already using ISES
          </p>
          <div className="mt-8">
            <a href="/signup" className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-100 text-indigo-600 dark:text-blue-700 text-lg font-semibold rounded-xl hover:bg-indigo-50 dark:hover:bg-white transform hover:-translate-y-1 transition-all duration-200 shadow-xl dark:shadow-blue-900/50">
              <span>Get Started Now</span>
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}

      <Footer />
    </div>
  );
};

export default LandingPage;
