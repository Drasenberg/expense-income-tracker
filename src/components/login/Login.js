import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginAction } from "../../store/auth";
import { useHistory } from "react-router-dom";
import { Fragment } from "react";
import axios from "axios";
import AcccountItem from "./accountItem/AccountItem";
import Button from "../../UI/Button";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const isLoggedIn = useSelector((state) => state.auth.token);
  const [accounts, setAccounts] = useState([]);
  const password = useSelector(state => state.auth.password)


  const onLogin = async (id) => {
    await axios
      .get("https://sledzenie-wydatkow-default-rtdb.firebaseio.com/users.json")
      .then((res) => {
        const data = res.data;
        const email = data[id].login;
        const userData = {
          email: email,
          password: password
        };
        history.push('/tracker')
        dispatch(loginAction(userData));
      });
      
  };
  const showAccount = () => {
    axios
      .get("https://sledzenie-wydatkow-default-rtdb.firebaseio.com/users.json")
      .then((res) => {
        const accounts = res.data;
        const arryOfAccounts = Object.values(accounts);
        setAccounts(arryOfAccounts);
      });
  };
  const listOfAccounts = accounts.map((account) => {
    return (
      <AcccountItem
        onLogin={onLogin.bind(this, account.id)}
        key={account.id}
        id={account.id}
        userName={account.login}
      />
    );
  });
  return (
    <Fragment>
      {/* <div onClick={onLogin.bind(this, "test")}>
        <p>test@test.com</p>
        <label htmlFor="passwd">Hasło</label>
        <input
          id="passwd"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
      </div> */}
      <Button onClick={showAccount}>Pokaż dostępne konta</Button>
      <div>{listOfAccounts}</div>
      {/* <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="e-mail">Adres E-mail</label>
          <input ref={emailInputRef} id="e-mail" type="email" />
        </div>
        <div className={classes.control}>
          <label htmlFor="passwd">Hasło</label>
          <input ref={passwordInputRef} id="passwd" type="password" />
        </div>
        <div className={classes.actions}>
          <button>Zaloguj</button>
        </div>
      </form> */}
    </Fragment>
  );
};

export default Login;
