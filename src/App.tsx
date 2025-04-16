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
import ProtectedRoutes from "./routes/ProtectedRoutes";
import LandingPage from "./pages/LandingPage";
import AuthRoutes from "./routes/AuthRoutes";
import EditActivityPage from "./pages/ActivityDetailsPage";
import { NotFound } from "./components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route element={<AuthRoutes />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<SignInPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPassPage />} />
            <Route path="/reset-password" element={<ResetPassPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/activity/:uuid" element={<EditActivityPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
