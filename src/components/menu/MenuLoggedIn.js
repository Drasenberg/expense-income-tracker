import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/auth";

import classes from "./MenuStyle.module.css";

const MenuLoggedIn = () => {
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/tracker">Śledzenie Wydatków</NavLink>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/tracker">Śledzenie Wydatków</NavLink>
          </li>
          <li>
            <NavLink to="/login-page" onClick={onLogOut}>
              Wyloguj Się
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MenuLoggedIn;
