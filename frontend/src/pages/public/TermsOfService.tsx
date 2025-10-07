import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Terms of Service</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using the Intelligent Student Evaluation System (ISES), you agree to be bound by these 
              Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, 
              you are prohibited from using or accessing this system.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Use License</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Permission is granted to temporarily access ISES for personal, educational, or institutional use, subject to the following conditions:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The system must be used as intended for educational assessment purposes</li>
                <li>You may not modify or copy the software or system components</li>
                <li>You may not attempt to decompile or reverse engineer the system</li>
                <li>You may not use the service for any illegal or unauthorized purpose</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                To access certain features of ISES, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Be responsible for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Intellectual Property</h2>
            <p className="text-gray-600">
              All content, features, and functionality of ISES, including but not limited to text, graphics, 
              logos, icons, images, audio clips, digital downloads, data compilations, and software, are the 
              exclusive property of ISES or its licensors and are protected by international copyright, 
              trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600">
              ISES and its licensors shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, 
              or any loss of data, use, goodwill, or other intangible losses resulting from your access to or 
              use of or inability to access or use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify or replace these terms at any time. If a revision is material, 
              we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
              a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@ises.edu" className="text-indigo-600 hover:text-indigo-800">
                legal@ises.edu
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

export default TermsOfService;