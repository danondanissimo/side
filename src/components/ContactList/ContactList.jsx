import { useSelector } from "react-redux";
import Contact from "../Contact/Contact.jsx";
import css from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contacts/selectors.js";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  // const filteredContacts = useSelector(selectContacts);

  return (
    <ul className={css.list}>
      {Array.isArray(filteredContacts) &&
        filteredContacts.length > 0 &&
        filteredContacts.map((contact) => {
          return (
            <li key={contact.id}>
              <Contact
                name={contact.name}
                number={contact.number}
                id={contact.id}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default ContactList;
