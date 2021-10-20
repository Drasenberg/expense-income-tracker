import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth';
import Button from '../../../UI/Button';
import classes from './AccountItem.module.css';

const AcccountItem = (props) => {
  const dispatch = useDispatch();

  const onLogin =   () => {
    // console.log(inputPasswordRef.current.value.toString());
    // props.onGetPassword(inputPasswordRef.current.value);
    // console.log(inputPasswordRef.current.value);
    // props.onLogin();
    // dispatch(authActions.onChangePassword(inputPasswordRef.current.value))
    props.onLogin();
  }
  const onPasswordChange = (event) => {
    dispatch(authActions.onChangePassword(event.target.value))
  }
  return (
    <div className={classes.accountItem}>
      <div onClick={props.onLogin}>
      <p>{props.userName}</p>
      </div>
      <div>
      <label htmlFor="passwd">Hasło </label>
      <input onChange={onPasswordChange} name="passwd" type="password" />
      </div>
      <Button onClick={onLogin} >Zaloguj</Button>
    </div>
  );
};

export default AcccountItem;