import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { GoKey } from "react-icons/go";
import { Formik, Form } from "formik";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import EyeButton from "../components/EyeButton";
import { SigninSchema } from "../schema/UserSchema";
import { Link } from "react-router-dom";

interface SignInProps {
  email: string;
  password: string;
}

const SignInPage = () => {
  const initialValues: SignInProps = {
    email: "",
    password: "",
  };

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <>
      <div className="w-sm">
        <Formik<SignInProps>
          initialValues={initialValues}
          validationSchema={SigninSchema}
          onSubmit={(values) => {
            console.log("sign in with: ", values);
          }}
        >
          {(props) => (
            <Form>
              <div className="flex items-center mb-[3rem]">
                <HiOutlineMail size={25} className="mr-10 mt-25" />
                <TextInput
                  label="E-mail"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="on"
                  value={props.values.email}
                  error={props.errors.email}
                  touched={props.touched.email}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
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
                  value={props.values.password}
                  error={props.errors.password}
                  touched={props.touched.password}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
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

              <Button type="submit" name="SIGN IN" className="w-xs" />
            </Form>
          )}
        </Formik>

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
