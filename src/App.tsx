import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
// import { Navbar } from "@/components/layout/Navbar";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { LoginPage } from "@/features/auth/LoginPage";
import { ContactUsPage } from "@/pages/ContactUsPage";
import FeedbackPage from "@/pages/FeedbackPage";
import { DashboardPage } from "@/features/dashboard/DashboardPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import VerificationPage from "@/pages/VerificationPage";
import NewPasswordPage from "@/pages/NewPasswordPage";
import SuccessPage from "@/pages/SuccessPage";
import EmergencyMode from "@/pages/EmergencyMode";
import EmergencyCallingPage from "@/pages/EmergencyCallingPage";
import EmergencyContactsPage from "@/pages/EmergencyContactsPage";
import LiveLocationPage from "@/pages/LiveLocationPage";
import EmergencySettingsPage from "@/pages/EmergencySettingsPage";
import { ROUTES } from "@/lib/constants";
import { LiveHazardMapPage } from "./features/dashboard/LiveHazardMapPage";
import { CreatePostPage } from "./features/dashboard/CreatePostPage";
import CommunityPage from "./features/dashboard/CommunityPage";
import { EmergencyHotlinesPage } from "./pages/EmergencyHotlinesPage";
import { ViewDetailsPage } from "./pages/ViewDetailsPage";
import { ReportUpdatesPage } from "./pages/ReportUpdatesPage";
import { SeeMorePage } from "./pages/SeeMorePage";
import { HelpAndSupportPage } from "@/pages/HelpAndSupportPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { NewsAndUpdatesRoute } from "@/routes/NewsAndUpdatesRoute";
import ChatbotPage from "@/pages/ChatbotPage";
import { GovernmentOfficial } from "@/pages/Verify_as_official/GovernmentOfficial";
import { NgoOfficial } from "@/pages/Verify_as_official/NgoOfficial";
import { GroupsPage } from "@/pages/GroupsPage";
import EvacuationCentersPage from "@/pages/EvacuationCentersPage";

import { HazardDetailsPage } from "@/pages/HazardDetailsPage";
import ReportDetailsPage from "./pages/ReportDetailsPage";

// Lazy load register
const LazyRegisterPage = React.lazy(() =>
  import("@/features/auth/RegisterPage").then((module) => ({
    default: (module as any).RegisterPage ?? (module as any).default,
  }))
);

// Layout for routes that require the top Navbar (if used)
const DashboardLayout = () => (
  <>
    {/* <Navbar /> */}
    <Outlet />
  </>
);

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-[#1f1816]">
        <React.Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
            </div>
          }
        >
          <Routes>
            {/* Public / Auth routes */}
            <Route
              path={ROUTES.LOGIN}
              element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <LoginPage />}
            />
            <Route
              path={ROUTES.REGISTER}
              element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <LazyRegisterPage />}
            />
            <Route
              path={ROUTES.FORGOT_PASSWORD}
              element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <ForgotPasswordPage />}
            />
            <Route
              path={ROUTES.VERIFICATION}
              element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <VerificationPage />}
            />
            <Route
              path={ROUTES.NEW_PASSWORD}
              element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <NewPasswordPage />}
            />
            <Route
              path={ROUTES.SUCCESS}
              element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <SuccessPage />}
            />
            <Route path={ROUTES.CONTACT_US} element={<ContactUsPage />} />
            <Route path={ROUTES.FEEDBACK} element={<FeedbackPage />} />

            {/* Protected routes with optional Navbar layout */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path={ROUTES.SUPPORT} element={<HelpAndSupportPage />} />
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTES.EVACUATION_CENTERS} element={<EvacuationCentersPage />} />
              <Route path={ROUTES.VERIFY_GOVERNMENT} element={<GovernmentOfficial />} />
              <Route path={ROUTES.VERIFY_NGO} element={<NgoOfficial />} />
            </Route>

            {/* Protected standalone routes */}
            <Route
              element={
                <ProtectedRoute>
                  <Outlet />
                </ProtectedRoute>
              }
            >
              <Route path={ROUTES.EMERGENCY_HOTLINES} element={<EmergencyHotlinesPage />} />
              <Route path={ROUTES.VIEW_DETAILS} element={<ViewDetailsPage />} />
              <Route path={ROUTES.REPORT_UPDATES} element={<ReportUpdatesPage />} />

              <Route path={ROUTES.REPORT_DETAILS} element={<ReportDetailsPage />} />

              <Route path={ROUTES.SEE_MORE} element={<SeeMorePage />} />
              <Route path={ROUTES.CHATBOT} element={<ChatbotPage />} />
            </Route>

            {/* Dashboard route - we intentionally render DashboardPage without Navbar to match mobile-first layout */}
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Live Hazard Map */}
            <Route
              path={ROUTES.LIVE_HAZARD_MAP}
              element={
                <ProtectedRoute>
                  <LiveHazardMapPage />
                </ProtectedRoute>
              }
            />

            <Route
              path={ROUTES.HAZARD_DETAILS}
              element={
                <ProtectedRoute>
                  <HazardDetailsPage />
                </ProtectedRoute>
              }
            />

            {/* Craete Post */}
            <Route
              path={ROUTES.CREATE_POST}
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              }
            />

            {/* Community Page */}
            <Route
              path={ROUTES.COMMUNITY}
              element={
                <ProtectedRoute>
                  <CommunityPage />
                </ProtectedRoute>
              }
            />

            {/* Groups Page */}
            <Route
              path={ROUTES.GROUPS}
              element={
                <ProtectedRoute>
                  <GroupsPage />
                </ProtectedRoute>
              }
            />

            {/* News and Updates */}
            <Route
              path={ROUTES.NEWS_AND_UPDATES}
              element={
                <ProtectedRoute>
                  <NewsAndUpdatesRoute />
                </ProtectedRoute>
              }
            />

            {/* Emergency / special full-screen routes */}
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

            {/* Root redirect */}
            <Route
              path="/"
              element={<Navigate to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN} replace />}
            />

            {/* Fallback 404 */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
                    <p className="text-[#bfb2ac]">The page you're looking for doesn't exist.</p>
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
