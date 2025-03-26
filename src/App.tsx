import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import TimerPage from "./pages/TimerPage";
import ActivityPage from "./pages/ActivityPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassPage from "./pages/ForgotPassPage";
import ResetPassPage from "./pages/ResetPassPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignInPage />} />,
            <Route path="/signup" element={<SignUpPage />} />,
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPassPage />} />
            <Route path="/reset-password" element={<ResetPassPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route
              path="/timer"
              element={
                <ProtectedRoute>
                  <TimerPage />
                </ProtectedRoute>
              }
            />
            ,
            <Route
              path="/activity"
              element={
                <ProtectedRoute>
                  <ActivityPage />
                </ProtectedRoute>
              }
            />
            ,
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
