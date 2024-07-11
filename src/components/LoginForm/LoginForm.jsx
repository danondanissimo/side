import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { apiLogin } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

const emailRegExp = /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

const minPasswordLength = 8;
const maxPasswordLength = 112;

const loginSchema = Yup.object({
  email: Yup.string()
    .required("Email is required!")
    .matches(emailRegExp, "Entered email address is not valid")
    .email("Please enter a valid email address!"),
  password: Yup.string()
    .required("Password is required!")
    .min(minPasswordLength, "Too short")
    .max(maxPasswordLength, "Too long"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const onAddContact = (values, actions) => {
    actions.resetForm();

    dispatch(apiLogin(values));
  };

  const FORM_INITIAL_VALUES = {
    email: "",
    password: "",
  };

  return (
    <div>
      {" "}
      <Formik
        initialValues={FORM_INITIAL_VALUES}
        validationSchema={loginSchema}
        onSubmit={onAddContact}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <span>Email</span>
            <Field type="text" name="email" className={css.field} />
            <ErrorMessage component="p" name="email" />
          </label>
          <label className={css.label}>
            <span>Password</span>
            <Field type="password" name="password" className={css.field} />
            <ErrorMessage component="p" name="password" />
          </label>
          <button type="submit" className={css.button}>
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
