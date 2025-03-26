import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { GoKey } from "react-icons/go";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import EyeButton from "../components/EyeButton";
import { SignupSchema } from "../schema/UserSchema";
import { signUp } from "../services/AuthService";

interface SignUpProps {
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik<SignUpProps>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        await signUp(values.email, values.password, values.confirmPassword);
        setStatus("Register successful!");
        navigate("/signin");
        console.log(setStatus);
      } catch (error) {
        if (error instanceof Error) {
          setStatus(error.message || "Register failed");
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
            </TextInput>
          </div>

          <Button type="submit" className="w-xs">
            SignUp
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
