import { useDispatch } from "react-redux";
import css from "./Contact.module.css";
import { openModal, openPopUp } from "../../redux/contacts/slice";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const popUpOpen = ({ id, name }) => {
    const userData = { id, name };
    const action = openPopUp(userData);
    dispatch(action);
  };

  const modalOpen = ({ id, name, number }) => {
    const contactData = { id, name, number };
    const action = openModal(contactData);
    dispatch(action);
  };

  return (
    <div className={css.contactContainer}>
      <h1 className={css.name}>{name}</h1>

      <a href={`tel:${number}`} className={css.number}>
        📞{number}
      </a>

      <button
        type="button"
        onClick={() => {
          popUpOpen({ id, name });
        }}
        className={css.deleteButton}
      >
        Delete
      </button>
      <button
        type="button"
        onClick={() => {
          modalOpen({ id, name, number });
        }}
        className={css.editButton}
      >
        Edit
      </button>
    </div>
  );
};

export default Contact;
