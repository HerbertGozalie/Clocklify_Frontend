import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { GoKey } from "react-icons/go";
import { Formik, Form } from "formik";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import EyeButton from "../components/EyeButton";
import { SignupSchema } from "../schema/UserSchema";

interface SignUpProps {
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUpPage = () => {
  const initialValues: SignUpProps = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <>
      <div className="w-sm">
        <Formik<SignUpProps>
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            console.log("sign up with: ", values);
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

              <div className="flex items-center mb-[3rem]">
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

              <div className="flex items-center">
                <GoKey size={24} className="mr-10" />
                <TextInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type={isVisible ? "text" : "password"}
                  autoComplete="on"
                  placeholder="Confirm Your Password"
                  value={props.values.confirmPassword}
                  error={props.errors.confirmPassword}
                  touched={props.touched.confirmPassword}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  className="border-f-light-grey"
                >
                  <EyeButton onClick={toggleVisibility} visible={isVisible} />
                </TextInput>
              </div>

              <Button
                type="submit"
                name="CREATE YOUR ACCOUNT"
                className="w-xs"
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignUpPage;
