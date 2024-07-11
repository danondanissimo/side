import { useEffect } from "react";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import { apiFetchContacts } from "../../redux/contacts/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { ErrorMessage } from "formik";
import Loader from "../../components/Loader/Loader";

import ContactForm from "../../components/ContactForm/ContactForm";
import ContactModal from "../../components/ContactModal/ContactModal";
import ContactPopUp from "../../components/ContactPopUp/ContactPopUp.jsx";
import css from "./ContactsPage.module.css";
import { selectIsSignedIn } from "../../redux/auth/selectors.js";

const ContactsPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const isSignedIn = useSelector(selectIsSignedIn);

  useEffect(() => {
    if (isSignedIn) {
      dispatch(apiFetchContacts());
    }
  }, [dispatch, isSignedIn]);

  return (
    <>
      <ContactForm />
      <SearchBox />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <ContactList />
      <ContactModal />
      <ContactPopUp />
      <a href="#header" className={css.upLink}>
        Go up
      </a>
    </>
  );
};

export default ContactsPage;
