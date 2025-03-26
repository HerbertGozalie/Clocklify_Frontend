import { useFormik } from "formik";
import { HiOutlineMail } from "react-icons/hi";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { ForgotPassSchema } from "../schema/UserSchema";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/AuthService";

interface ForgotPassProps {
  email: string;
}

const ForgotPassPage = () => {
  const navigate = useNavigate();

  const formik = useFormik<ForgotPassProps>({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPassSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        await forgotPassword(values.email);
        setStatus("email sent!");
        navigate("/reset-password");
      } catch (error) {
        if (error instanceof Error) {
          setStatus(error.message || "Sent email failed");
        }
      }
    },
  });

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

          <Button type="submit" className="w-xs">
            Reset Password
          </Button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassPage;
