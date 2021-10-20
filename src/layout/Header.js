import { Fragment } from "react";
import { useSelector } from "react-redux";
import MenuLoggedIn from "../components/menu/MenuLoggedIn";
import MenuNotLoggedIn from "../components/menu/MenuNotLoggedIn";



const Header = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <Fragment>
    {!isLoggedIn && <MenuNotLoggedIn />}
    {isLoggedIn && <MenuLoggedIn />}
    </Fragment>
  );
};

export default Header;
