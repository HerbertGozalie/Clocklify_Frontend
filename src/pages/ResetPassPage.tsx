import { useEffect, useState } from "react";
import { useFormik } from "formik";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { ResetPassSchema } from "../schema/UserSchema";
import { GoKey } from "react-icons/go";
import EyeButton from "../components/EyeButton";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/AuthService";

interface ResetPassProps {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    onSubmit: async (values, { setStatus }) => {
      try {
        await resetPassword(
          resetToken!,
          values.newPassword,
          values.confirmPassword
        );
        setStatus("Reset Password Successful");
        navigate("/signin");
      } catch (error) {
        if (error instanceof Error) {
          setStatus(error.message || "Reset Password Failed");
          console.log(JSON.stringify(error));
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
            <GoKey size={24} className="mr-10" />
            <TextInput
              id="newPassword"
              name="newPassword"
              type={isVisible ? "text" : "password"}
              autoComplete="on"
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
            Reset Your Password
          </Button>
        </form>
      </div>
    </>
  );
};

export default ResetPassPage;
