import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Privacy Policy</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              The Intelligent Student Evaluation System (ISES) collects information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Create an account and use our services</li>
              <li>Submit assignments and academic work</li>
              <li>Participate in evaluations and assessments</li>
              <li>Contact us for support or questions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Provide and improve our evaluation services</li>
              <li>Generate personalized feedback and assessments</li>
              <li>Analyze and enhance system performance</li>
              <li>Communicate with you about your account and our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information from unauthorized access, 
              alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Strict access controls and authentication</li>
              <li>Regular backups and data recovery procedures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of certain data processing activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@ises.edu" className="text-indigo-600 hover:text-indigo-800">
                privacy@ises.edu
              </a>
            </p>
          </section>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Last updated: October 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;