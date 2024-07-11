import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  apiAddContact,
  apiDeleteContact,
  apiEditContact,
  apiFetchContacts,
} from "./operations";
import toast from "react-hot-toast";

const INITIAL_STATE = {
  contacts: {
    items: null,
    loading: false,
    error: null,
  },
  modal: {
    isOpen: false,
    content: {
      name: null,
      id: null,
      number: null,
    },
  },
  popUp: {
    isOpen: false,
    item: {
      name: null,
      id: null,
    },
  },
};

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: "contact",
  // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE,
  reducers: {
    openModal: (state, action) => {
      state.modal.isOpen = true;
      state.modal.content.name = action.payload.name;
      state.modal.content.number = action.payload.number;
      state.modal.content.id = action.payload.id;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.content.name = null;
      state.modal.content.number = null;
      state.modal.content.id = null;
    },
    openPopUp: (state, action) => {
      state.popUp.isOpen = true;
      state.popUp.item.name = action.payload.name;
      state.popUp.item.id = action.payload.id;
    },
    closePopUp: (state) => {
      state.popUp.isOpen = false;
      state.popUp.item.name = null;
      state.popUp.item.id = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiFetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;

        state.contacts.items = state.contacts.items.filter(
          (contact) => contact.id !== action.payload.id
        );
        toast.success(
          `Contact ${action.payload.name} has been deleted successfully.`
        );
      })
      .addCase(apiAddContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;

        state.contacts.items = state.contacts.items.toSpliced(
          state.contacts.items.length + 1,
          0,
          action.payload
        );
        toast.success(
          `Contact ${action.payload.name} has been added successfully.`
        );
      })
      .addCase(apiEditContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items
          .filter((contact) => contact.id !== action.payload.id)
          .toSpliced(state.contacts.items.length + 1, 0, action.payload);
        toast.success(
          `Contact ${action.payload.name} has been updated successfully.`
        );
      })
      .addMatcher(
        isAnyOf(
          apiFetchContacts.pending,
          apiAddContact.pending,
          apiDeleteContact.pending,
          apiEditContact.pending
        ),
        (state) => {
          state.contacts.isLoading = true;
          state.contacts.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          apiFetchContacts.rejected,
          apiAddContact.rejected,
          apiDeleteContact.rejected,
          apiEditContact.rejected
        ),
        (state, action) => {
          state.contacts.isLoading = false;
          state.contacts.error = action.payload;
        }
      );
  },
});

export const { openModal, closeModal, openPopUp, closePopUp } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
