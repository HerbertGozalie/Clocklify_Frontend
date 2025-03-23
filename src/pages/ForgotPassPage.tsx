import { Formik, Form } from "formik";
import { HiOutlineMail } from "react-icons/hi";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { ForgotPassSchema } from "../schema/UserSchema";

interface ForgotPassProps {
  email: string;
}

const ForgotPassPage = () => {
  const initialValues: ForgotPassProps = {
    email: "",
  };
  return (
    <>
      <div className="w-sm">
        <Formik<ForgotPassProps>
          initialValues={initialValues}
          validationSchema={ForgotPassSchema}
          onSubmit={(values) => {
            console.log("Send forgot email: ", values);
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

              <Button type="submit" name="RESET PASSWORD" className="w-xs" />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ForgotPassPage;
