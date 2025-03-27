import { useState, useEffect } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { GoKey } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import EyeButton from "../components/EyeButton";
import ErrorText from "../components/ErrorText";
import Modal from "../components/Modal";
import { SignupSchema } from "../schema/UserSchema";
import { registerUser } from "../services/AuthService";

interface SignUpProps {
  email: string;
  password: string;
  confirmPassword: string;
}

interface MyErrorResponse {
  status: string;
  errors: {
    message: string;
  };
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const [hasBackendError, setHasBackendError] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const formik = useFormik<SignUpProps>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        await registerUser(
          values.email,
          values.password,
          values.confirmPassword
        );
        setModalOpen(true);
        setStatus({ success: "Register successful!" });
      } catch (err) {
        // if (error instanceof Error) {
        //   setStatus(error.message || "Login failed");
        // setError(true);
        // }
        const axiosError = err as AxiosError<MyErrorResponse>;
        console.error("Login Error:", axiosError);
        if (
          axiosError.response &&
          axiosError.response.data &&
          axiosError.response.data.errors
        ) {
          setStatus({
            error: axiosError.response.data.errors.message || "Register failed",
          });
        } else {
          setStatus({ error: axiosError.message || "Register failed" });
        }
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
            ></TextInput>
          </div>

          <div className="flex items-center mb-[3rem]">
            <GoKey size={24} className="mr-10" />
            <TextInput
              id="password"
              name="password"
              type={isVisible ? "text" : "password"}
              autoComplete="on"
              placeholder="Input Your Password"
              value={formik.values.password}
              error={formik.errors.password}
              touched={formik.touched.password}
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
              autoComplete="on"
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

          <Button type="submit" className="w-xs">
            SignUp
          </Button>
        </form>

        {/* Show the registration success modal */}
        {modalOpen && (
          <Modal
            open={modalOpen}
            setOpen={setModalOpen}
            title="Success"
            message="Your account has been successed created. Please check your email for verification."
          />
        )}
      </div>
    </>
  );
};

export default SignUpPage;
