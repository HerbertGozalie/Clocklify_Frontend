import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { GoKey } from "react-icons/go";
import { useFormik } from "formik";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import EyeButton from "../components/EyeButton";
import ErrorText from "../components/ErrorText";
import useAuth from "../hooks/useAuth";
import { SigninSchema } from "../schema/UserSchema";
import { loginUser } from "../services/AuthService";
import { getErrorMessage } from "../services/HandleApiError";

interface SignInProps {
  email: string;
  password: string;
}

const SignInPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const [hasBackendError, setHasBackendError] = useState<boolean>(false);

  const formik = useFormik<SignInProps>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SigninSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const data = await loginUser(values.email, values.password);
        // console.log("login data:", data); => for debugging purposes
        signIn(
          {
            uuid: data.user.uuid,
            email: data.user.email,
          },
          data.token
        );
        setStatus({ success: "Login successful!" });
        // console.log("Redirecting now..."); => for debugging purposes
        navigate("/timer");
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
  }, [formik]);

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
            />
          </div>

          <div className="flex items-center">
            <GoKey size={24} className="mr-10" />
            <TextInput
              id="password"
              name="password"
              type={isVisible ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Input Your Password"
              value={formik.values.password}
              error={formik.errors.password}
              touched={formik.touched.password}
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

          <div className="text-right mt-15">
            <Link
              to="/forgot-password"
              className="text-f-light-grey font-light underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex justify-center mt-60">
            <Button type="submit" className="w-xs">
              SignIn
            </Button>
          </div>
        </form>

        <div className="text-center mt-10">
          <Link to="/register" className="font-light underline">
            Create new account?
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
