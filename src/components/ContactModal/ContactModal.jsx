import css from "./ContactModal.module.css";
import {
  selectModalContentId,
  selectModalContentName,
  selectModalContentNumber,
  selectModalIsOpen,
} from "../../redux/contacts/selectors";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/contacts/slice";
import { Box, Dialog } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { apiEditContact } from "../../redux/contacts/operations";

const phoneRegExp = /^\d{3}-\d{3}-\d{4}$/;
const minNameLength = 3;
const maxNameLength = 50;

const contactSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(minNameLength, "Too short!")
    .max(maxNameLength, "Too long!"),
  number: Yup.string()
    .required()
    .matches(phoneRegExp, "Phone number is not valid"),
});

const ContactModal = () => {
  const dispatch = useDispatch();

  const modalClose = () => {
    const action = closeModal();
    dispatch(action);
  };

  const isOpen = useSelector(selectModalIsOpen);

  const modalContentName = useSelector(selectModalContentName);
  const modalContentNumber = useSelector(selectModalContentNumber);

  const FORM_INITIAL_VALUES = {
    name: modalContentName,
    number: modalContentNumber,
  };

  const modalContentId = useSelector(selectModalContentId);

  const onEditContact = (values) => {
    const finalContact = {
      ...values,
      id: modalContentId,
    };

    const action = apiEditContact(finalContact);

    dispatch(action);
    modalClose();
  };

  return (
    <>
      {modalContentName && (
        <Dialog open={isOpen} onClose={modalClose}>
          <Box>
            <Formik
              initialValues={FORM_INITIAL_VALUES}
              validationSchema={contactSchema}
              onSubmit={onEditContact}
            >
              <Form className={css.form}>
                <label className={css.label}>
                  <span>Name</span>
                  <Field type="text" name="name" className={css.field} />
                  <ErrorMessage
                    component="p"
                    name="name"
                    className={css.errorMessage}
                  />
                </label>
                <label className={css.label}>
                  <span>Number</span>
                  <Field type="text" name="number" className={css.field} />
                  <ErrorMessage
                    component="p"
                    name="number"
                    className={css.errorMessage}
                  />
                </label>

                <button type="submit" className={css.submitButton}>
                  Edit Contact
                </button>
                <button
                  type="button"
                  onClick={modalClose}
                  className={css.closeButton}
                >
                  Close
                </button>
              </Form>
            </Formik>
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default ContactModal;
