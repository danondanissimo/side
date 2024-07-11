import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { apiRegister } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

const emailRegExp = /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

const minNameLength = 3;
const maxNameLength = 50;
const minPasswordLength = 8;
const maxPasswordLength = 112;

const registrationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(minNameLength, "Too short!")
    .max(maxNameLength, "Too long!"),
  email: Yup.string()
    .required("Email is required!")
    .matches(emailRegExp, "Entered email address is not valid")
    .email("Please enter a valid email address!"),
  password: Yup.string()
    .required("Password is required!")
    .min(minPasswordLength, "Too short")
    .max(maxPasswordLength, "Too long"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const onRegisterAccount = (values, actions) => {
    actions.resetForm();

    dispatch(apiRegister(values));
  };

  const FORM_INITIAL_VALUES = {
    name: "",
    email: "",
    password: "",
  };
  return (
    <div>
      <Formik
        initialValues={FORM_INITIAL_VALUES}
        validationSchema={registrationSchema}
        onSubmit={onRegisterAccount}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <span>Name</span>
            <Field type="text" name="name" className={css.field} />
            <ErrorMessage component="p" name="name" />
          </label>
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
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
