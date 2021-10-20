import { NavLink } from "react-router-dom";

import classes from './MenuStyle.module.css';

const MenuNotLoggedIn = () => {

  return <header className={classes.header}>
  <div className={classes.logo}>
    <NavLink to="/demo-tracker">Śledzenie Wydatków</NavLink>
  </div>
  <nav className={classes.nav}>
    <ul>
      <li>
        <NavLink to="/demo-tracker">Śledzenie Wydatków</NavLink>
      </li>
      <li>
        <NavLink to="/login-page">Zaloguj Się</NavLink>
      </li>
    </ul>
  </nav>
</header>
}

export default MenuNotLoggedIn;