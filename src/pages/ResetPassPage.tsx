import { useState } from "react";
import { Formik, Form } from "formik";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { ResetPassSchema } from "../schema/UserSchema";
import { GoKey } from "react-icons/go";
import EyeButton from "../components/EyeButton";

interface ResetPassProps {
  password: string;
  confirmPassword: string;
}

const ResetPassPage = () => {
  const initialValues: ResetPassProps = {
    password: "",
    confirmPassword: "",
  };

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);
  return (
    <>
      <div className="w-sm">
        <Formik<ResetPassProps>
          initialValues={initialValues}
          validationSchema={ResetPassSchema}
          onSubmit={(values) => {
            console.log("sign up with: ", values);
          }}
        >
          {(props) => (
            <Form>
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
                name="RESET YOUR PASSWORD"
                className="w-xs"
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ResetPassPage;
