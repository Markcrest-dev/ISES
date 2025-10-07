import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">ISES</h3>
            <p className="text-gray-300 text-sm">
              Intelligent Student Evaluation System - Transforming education through AI-powered assessment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-300 hover:text-white text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* User Access */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">User Access</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white text-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-white text-sm">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/student/dashboard" className="text-gray-300 hover:text-white text-sm">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/instructor/dashboard" className="text-gray-300 hover:text-white text-sm">
                  Instructor Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="text-gray-300 hover:text-white text-sm">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@ises.edu" className="text-gray-300 hover:text-white text-sm">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">
                Email: info@ises.edu
              </li>
              <li className="text-gray-300 text-sm">
                Phone: +234 123 456 7890
              </li>
              <li className="text-gray-300 text-sm">
                Address: University of Nigeria, Nsukka
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-gray-300 text-sm text-center">
            © {new Date().getFullYear()} ISES. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;