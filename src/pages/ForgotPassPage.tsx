import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { HiOutlineMail } from "react-icons/hi";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import Modal from "../components/Modal";
import { ForgotPassSchema } from "../schema/UserSchema";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/AuthService";
import { getErrorMessage } from "../services/HandleApiError";

interface ForgotPassProps {
  email: string;
}

const ForgotPassPage = () => {
  const navigate = useNavigate();
  const [hasBackendError, setHasBackendError] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const formik = useFormik<ForgotPassProps>({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPassSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        await forgotPassword(values.email);
        setModalOpen(true);
        setStatus({ success: "Email sent successful!" });
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
            <HiOutlineMail size={25} className="mr-10 mt-25" />
            <TextInput
              label="E-mail"
              id="email"
              name="email"
              type="email"
              autoComplete="on"
              value={formik.values.email}
              error={formik.errors.email}
              touched={formik.touched.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
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
              Reset Password
            </Button>
          </div>
        </form>
        {/* Show the registration success modal */}
        {modalOpen && (
          <Modal
            open={modalOpen}
            setOpen={setModalOpen}
            title="Success"
            message="Check your email to reset password!"
          />
        )}
      </div>
    </>
  );
};

export default ForgotPassPage;
