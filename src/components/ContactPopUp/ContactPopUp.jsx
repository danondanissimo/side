import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import {
  selectPopUpIsOpen,
  selectPopUpItemId,
  selectPopUpItemName,
} from "../../redux/contacts/selectors";
import { useDispatch, useSelector } from "react-redux";
import { closePopUp } from "../../redux/contacts/slice";
import { apiDeleteContact } from "../../redux/contacts/operations";
import css from "./ContactPopUp.module.css";

const ContactPopUp = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectPopUpIsOpen);
  const popUpClose = () => {
    const action = closePopUp();
    dispatch(action);
  };

  const item = useSelector(selectPopUpItemId);
  const deleteContact = () => {
    dispatch(apiDeleteContact(item));

    popUpClose();
  };
  const contactName = useSelector(selectPopUpItemName);
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogContentText>
          {`          It will be impossible to restore the ${contactName} contact after deletion. Would you
          like to proceed with its deletion?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button onClick={deleteContact} className={css.confirmButton}>
          Yes
        </button>

        <button type="button" onClick={popUpClose} className={css.closeButton}>
          No
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactPopUp;
