import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import TimerPage from "./pages/TimerPage";
import ActivityPage from "./pages/ActivityPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassPage from "./pages/ForgotPassPage";
import ResetPassPage from "./pages/ResetPassPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignInPage />} />,
            <Route path="/signup" element={<SignUpPage />} />,
            <Route path="/forgot-password" element={<ForgotPassPage />} />
            <Route path="/reset-password" element={<ResetPassPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/timer" element={<TimerPage />} />,
            <Route path="/activity" element={<ActivityPage />} />,
          </Route>
          ,
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
