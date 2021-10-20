import Date from "../../date/Date";
import classes from "./Income.module.css";

const Income = (props) => {
  const deleteIncomeHandler = () => {
    const price = parseFloat(props.price).toFixed(2)
    props.removeIncomesAmount(price);
    props.onDeleteIncomeHandler(props.id);
  };
  return (
    <li onClick={deleteIncomeHandler} className={classes["income-item"]}>
      <Date date={props.date} />
      <div className={classes.title}>{props.title}</div>
      <div className={classes.price}>{props.price} zł</div>
    </li>
  );
};

export default Income;
