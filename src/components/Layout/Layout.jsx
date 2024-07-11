import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsSignedIn, selectUserName } from "../../redux/auth/selectors";
import { apiLogOut } from "../../redux/auth/operations";
import css from "./Layout.module.css";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectIsSignedIn);
  // const userData = useSelector(selectUserData);
  // console.log(userData);
  const userName = useSelector(selectUserName);

  const logOut = () => {
    dispatch(apiLogOut());
  };

  return (
    <div>
      <header id="header">
        <nav className={css.nav}>
          <ul className={css.navList}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {isSignedIn && (
              <li>
                <NavLink to="/contacts">Contacts</NavLink>
              </li>
            )}
          </ul>

          {isSignedIn ? (
            <>
              <ul className={css.navList}>
                <li className={css.user}>Greetings, {userName}</li>
                <li>
                  <button
                    onClick={logOut}
                    type="button"
                    className={css.logOutButton}
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className={css.navList}>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </ul>
            </>
          )}
        </nav>
      </header>
      <main className={css.main}>{children}</main>
    </div>
  );
};

export default Layout;
