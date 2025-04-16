import { useEffect, useState } from "react";
import { useFormik } from "formik";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { ResetPassSchema } from "../schema/UserSchema";
import { GoKey } from "react-icons/go";
import EyeButton from "../components/EyeButton";
import ErrorText from "../components/ErrorText";
import Modal from "../components/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/AuthService";
import { getErrorMessage } from "../services/HandleApiError";

interface ResetPassProps {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const [hasBackendError, setHasBackendError] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const params = new URLSearchParams(location.search);
  const resetToken = params.get("resetToken");

  useEffect(() => {
    if (!resetToken) {
      navigate("/forgot-password");
      return;
    }
  }, [resetToken, navigate]);

  const formik = useFormik<ResetPassProps>({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ResetPassSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        await resetPassword(
          resetToken!,
          values.newPassword,
          values.confirmPassword
        );
        setModalOpen(true);
        setStatus({ success: "Reset password successful!" });
      } catch (err) {
        setStatus({ error: getErrorMessage(err) });
        setHasBackendError(true);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (Object.keys(formik.errors).length > 0 && formik.status?.error) {
      formik.setStatus({});
      setHasBackendError(false);
    }
    if (!modalOpen && formik.status?.success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [modalOpen, formik, navigate]);

  return (
    <>
      <div className="w-sm">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center mb-[3rem]">
            <GoKey size={24} className="mr-10" />
            <TextInput
              id="newPassword"
              name="newPassword"
              type={isVisible ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Input Your Password"
              value={formik.values.newPassword}
              error={formik.errors.newPassword}
              touched={formik.touched.newPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="border-f-light-grey"
            >
              <EyeButton onClick={toggleVisibility} visible={isVisible} />
            </TextInput>
          </div>

          <div className="flex items-center">
            <GoKey size={24} className="mr-10" />
            <TextInput
              id="confirmPassword"
              name="confirmPassword"
              type={isVisible ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Confirm Your Password"
              value={formik.values.confirmPassword}
              error={formik.errors.confirmPassword}
              touched={formik.touched.confirmPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="border-f-light-grey"
            >
              <EyeButton onClick={toggleVisibility} visible={isVisible} />
              {/* Display error message if any exists in Formik status */}
              {formik.status && formik.status.error && (
                <ErrorText error={hasBackendError}>
                  {formik.status.error}
                </ErrorText>
              )}
            </TextInput>
          </div>

          <div className="flex justify-center mt-60">
            <Button type="submit" className="w-xs">
              Reset Your Password
            </Button>
          </div>
        </form>
        {/* Show the registration success modal */}
        {modalOpen && (
          <Modal
            open={modalOpen}
            setOpen={setModalOpen}
            title="Success"
            message="You're all set!."
          />
        )}
      </div>
    </>
  );
};

export default ResetPassPage;
