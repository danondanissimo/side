import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { apiLogOut, apiLogin, apiRefreshUser, apiRegister } from "./operations";

export const instance = axios.create({
  baseURL: "https://connections-api.herokuapp.com",
});

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = "";
};

const INITIAL_STATE = {
  isSignedIn: false,
  userData: null,
  user: {
    name: null,
    email: null,
  },
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  // Ім'я слайсу
  name: "auth",
  // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(apiRegister.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;

        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.token = action.payload.token;
        state.isSignedIn = true;
      })
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;

        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.token = action.payload.token;
        state.isSignedIn = true;
      })
      .addCase(apiLogOut.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;

        state.isSignedIn = true;
      })
      .addMatcher(
        isAnyOf(
          apiRegister.pending,
          apiLogin.pending,
          apiLogOut.pending,
          apiRefreshUser.pending
        ),
        (state) => {
          state.error = null;
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          apiRegister.rejected,
          apiLogin.rejected,
          apiLogOut.rejected,
          apiRefreshUser.rejected
        ),
        (state, action) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  },
});

// Генератори екшенів
// export const { addContact, deleteContact } = contactsSlice.actions;

// Редюсер слайсу
export const authReducer = authSlice.reducer;
