import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Navbar } from '@/components/layout/Navbar';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { LoginPage } from '@/pages/LoginPage';
import { ContactUsPage } from '@/pages/ContactUsPage';
import FeedbackPage from '@/pages/FeedbackPage';
import { DashboardPage } from '@/pages/DashboardPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import VerificationPage from '@/pages/VerificationPage';
import NewPasswordPage from '@/pages/NewPasswordPage';
import SuccessPage from '@/pages/SuccessPage';
import EmergencyMode from '@/pages/EmergencyMode';
import EmergencyCallingPage from '@/pages/EmergencyCallingPage';
import EmergencyContactsPage from '@/pages/EmergencyContactsPage';
import LiveLocationPage from '@/pages/LiveLocationPage';
import EmergencySettingsPage from '@/pages/EmergencySettingsPage';
import { ROUTES } from '@/lib/constants';

// Lazy load pages for better performance
const LazyRegisterPage = React.lazy(() => 
  import('@/pages/RegisterPage').then(module => ({ 
    default: module.RegisterPage 
  }))
);

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <React.Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
            </div>
          }
        >
          <Routes>
            {/* Auth routes - no navbar */}
            <Route
              path={ROUTES.LOGIN}
              element={
                isAuthenticated ? (
                  <Navigate to={ROUTES.DASHBOARD} replace />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              path={ROUTES.REGISTER}
              element={
                isAuthenticated ? (
                  <Navigate to={ROUTES.DASHBOARD} replace />
                ) : (
                  <LazyRegisterPage />
                )
              }
            />
            <Route
              path={ROUTES.FORGOT_PASSWORD}
              element={
                isAuthenticated ? (
                  <Navigate to={ROUTES.DASHBOARD} replace />
                ) : (
                  <ForgotPasswordPage />
                )
              }
            />
            <Route
              path={ROUTES.VERIFICATION}
              element={
                isAuthenticated ? (
                  <Navigate to={ROUTES.DASHBOARD} replace />
                ) : (
                  <VerificationPage />
                )
              }
            />
            <Route
              path={ROUTES.NEW_PASSWORD}
              element={
                isAuthenticated ? (
                  <Navigate to={ROUTES.DASHBOARD} replace />
                ) : (
                  <NewPasswordPage />
                )
              }
            />
            <Route
              path={ROUTES.SUCCESS}
              element={
                isAuthenticated ? (
                  <Navigate to={ROUTES.DASHBOARD} replace />
                ) : (
                  <SuccessPage />
                )
              }
            />
            <Route
              path={ROUTES.CONTACT_US}
              element={<ContactUsPage />}
            />
            <Route
              path={ROUTES.FEEDBACK}
              element={<FeedbackPage />}
            />

            {/* Protected routes - with navbar */}
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <DashboardPage />
                  </>
                </ProtectedRoute>
              }
            />

            {/* Emergency Mode Routes - No navbar for full screen experience */}
            <Route
              path={ROUTES.EMERGENCY_MODE}
              element={
                <ProtectedRoute>
                  <EmergencyMode />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.EMERGENCY_CALLING}
              element={
                <ProtectedRoute>
                  <EmergencyCallingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.EMERGENCY_CONTACTS}
              element={
                <ProtectedRoute>
                  <EmergencyContactsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.LIVE_LOCATION}
              element={
                <ProtectedRoute>
                  <LiveLocationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.EMERGENCY_SETTINGS}
              element={
                <ProtectedRoute>
                  <EmergencySettingsPage />
                </ProtectedRoute>
              }
            />

            {/* Redirect root to appropriate page */}
            <Route
              path={ROUTES.HOME}
              element={
                <Navigate
                  to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN}
                  replace
                />
              }
            />

            {/* Catch all route */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      404 - Page Not Found
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      The page you're looking for doesn't exist.
                    </p>
                  </div>
                </div>
              }
            />
          </Routes>
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;