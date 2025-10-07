import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Okafor Chinaza Mark",
      role: "Lead Developer",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      description: "Final year Computer Science student with expertise in AI and machine learning."
    },
    {
      name: "Dr. John Smith",
      role: "Project Supervisor",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      description: "Professor of Computer Science with over 15 years of experience in AI and education technology."
    },
    // Add more team members as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-16 pb-12 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            About ISES
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Revolutionizing student evaluation through artificial intelligence
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ISES aims to transform the educational landscape by providing fair, consistent, and 
              efficient student evaluation through advanced artificial intelligence. We believe in 
              empowering educators and students with technology that enhances the learning experience.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">
              The dedicated individuals behind ISES
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <img
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                    src={member.image}
                    alt={member.name}
                  />
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 text-center mb-4">{member.role}</p>
                  <p className="text-gray-600 text-center">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accuracy</h3>
              <p className="text-gray-600">
                Committed to providing precise and fair evaluations through advanced AI technology
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Continuously improving our technology to better serve educators and students
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600">
                Making advanced evaluation tools available to all educational institutions
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;