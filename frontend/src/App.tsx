import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ApiTest from './components/ApiTest';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './contexts/ThemeContext';
import AdminDashboard from './pages/admin/Dashboard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import InstructorDashboard from './pages/instructor/Dashboard';
import EvaluateStudent from './pages/instructor/EvaluateStudent';
import ManageStudents from './pages/instructor/ManageStudents';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import FeaturesPage from './pages/public/FeaturesPage';
import LandingPage from './pages/public/LandingPage';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsOfService from './pages/public/TermsOfService';
import StudentDashboard from './pages/student/Dashboard';
import MyEvaluations from './pages/student/MyEvaluations';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/test" element={<ApiTest />} />

            {/* Student routes */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/evaluations"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <MyEvaluations />
                </ProtectedRoute>
              }
            />

            {/* Instructor routes */}
            <Route
              path="/instructor/dashboard"
              element={
                <ProtectedRoute allowedRoles={['instructor']}>
                  <InstructorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor/evaluate"
              element={
                <ProtectedRoute allowedRoles={['instructor']}>
                  <EvaluateStudent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor/manage-students"
              element={
                <ProtectedRoute allowedRoles={['instructor']}>
                  <ManageStudents />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;