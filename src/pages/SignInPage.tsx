import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { GoKey } from "react-icons/go";
import { useFormik } from "formik";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import EyeButton from "../components/EyeButton";
import { SigninSchema } from "../schema/UserSchema";
import { Link } from "react-router-dom";
import { signIn } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface SignInProps {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn: setAuthContext } = useAuth();

  const formik = useFormik<SignInProps>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SigninSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        const data = await signIn(values.email, values.password);
        // console.log("login data:", data); => for debugging purposes
        setAuthContext(
          {
            uuid: data.user.uuid,
            email: data.user.email,
          },
          data.token
        );
        setStatus("Login successful!");
        // console.log("Redirecting now..."); => for debugging purposes
        navigate("/timer");
      } catch (error) {
        if (error instanceof Error) {
          setStatus(error.message || "Login failed");
        }
      }
    },
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

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

          <div className="text-right mt-10">
            <Link
              to="/forgot-password"
              className="text-f-light-grey font-light underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-xs">
            SignIn
          </Button>
        </form>

        <div className="text-center mt-10">
          <Link to="/signup" className="font-light underline">
            Create new account?
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
