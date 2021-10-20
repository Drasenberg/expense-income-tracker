import classes from './Balance.module.css';

const Balance = (props) => {
  const balanceFixed = parseFloat(props.balance).toFixed(2);
  return <div className={classes.balance}>
    <h2>Saldo: {balanceFixed}zł</h2>
  </div>
}

export default Balance;