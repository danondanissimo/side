import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filters/selectors";

export const selectContacts = (state) => {
  return state.contact.contacts.items;
};

export const selectLoading = (state) => {
  return state.contact.contacts.loading;
};

export const selectError = (state) => {
  return state.contact.contacts.error;
};

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!contacts) return [];
    return contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
      );
    });
  }
);

export const selectModalIsOpen = (state) => {
  return state.contact.modal.isOpen;
};

export const selectModalContentName = (state) => {
  return state.contact.modal.content.name;
};

export const selectModalContentNumber = (state) => {
  return state.contact.modal.content.number;
};

export const selectModalContentId = (state) => {
  return state.contact.modal.content.id;
};

export const selectPopUpIsOpen = (state) => {
  return state.contact.popUp.isOpen;
};

export const selectPopUpItemName = (state) => {
  return state.contact.popUp.item.name;
};

export const selectPopUpItemId = (state) => {
  return state.contact.popUp.item.id;
};
