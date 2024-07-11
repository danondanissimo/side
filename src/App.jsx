import "./App.css";

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";

import Loader from "./components/Loader/Loader.jsx";

import { selectError, selectLoading } from "./redux/contacts/selectors.js";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import ContactsPage from "./pages/ContactsPage/ContactsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Layout from "./components/Layout/Layout.jsx";

import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import { apiRefreshUser } from "./redux/auth/operations.js";
import { Toaster } from "react-hot-toast";
import {
  selectAccountError,
  selectIsSignedIn,
} from "./redux/auth/selectors.js";

function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);

  const isError = useSelector(selectError);
  const isAccountError = useSelector(selectAccountError);
  const isSignedIn = useSelector(selectIsSignedIn);

  useEffect(() => {
    if (isSignedIn) {
      dispatch(apiRefreshUser());
    }
  }, [dispatch, isSignedIn]);

  return (
    <>
      <header></header>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute>
                <RegistrationPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <Toaster />
      {isError || (isAccountError && <ErrorMessage />)}
      {isLoading && <Loader />}
    </>
  );
}

export default App;
