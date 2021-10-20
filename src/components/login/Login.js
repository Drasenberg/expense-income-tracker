import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginAction } from "../../store/auth";
import { NavLink, useHistory } from "react-router-dom";
import { Fragment } from "react";
import axios from "axios";
import AcccountItem from "./accountItem/AccountItem";
import classes from './Login.module.css';
import Button from "../../UI/Button";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const isLoggedIn = useSelector((state) => state.auth.token);
  const [accounts, setAccounts] = useState([]);
  const password = useSelector((state) => state.auth.password);

  const onLogin = async (id) => {
    await axios
      .get("https://sledzenie-wydatkow-default-rtdb.firebaseio.com/users.json")
      .then((res) => {
        const data = res.data;
        const email = data[id].login;
        const userData = {
          email: email,
          password: password,
        };
        history.push("/tracker");
        dispatch(loginAction(userData));
      });
  };

  useEffect(() => {
    const showAccount = async () => {
      await axios
        .get(
          "https://sledzenie-wydatkow-default-rtdb.firebaseio.com/users.json"
        )
        .then((res) => {
          const accounts = res.data;
          const arryOfAccounts = Object.values(accounts);
          setAccounts(arryOfAccounts);
        });
    };
    showAccount().catch((error) => {
      console.log(error);
    });
  }, []);

  const listOfAccounts = accounts.map((account) => {
    return (
      <AcccountItem
        onLogin={onLogin.bind(this, account.id)}
        key={account.id}
        id={account.id}
        userName={account.id}
      />
    );
  });
  return (
    <Fragment>
      <button class={classes.btn}>
      <NavLink className={classes.demoLink} to='/demo-tracker'>Demo</NavLink>
      </button>
      <div className={classes.listOfAccounts}>{listOfAccounts}</div>
    </Fragment>
  );
};

export default Login;
