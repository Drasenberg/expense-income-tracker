import Date from "../../date/Date";

import classes from "./Expense.module.css";

const Expense = (props) => {
  const deleteExpenseHandler = () => {
    const price = parseFloat(props.price).toFixed(2)
    props.onDeleteExpenseHandler(props.id);
    props.setExpensesAmount(-price);
  };

  return (
    <li onClick={deleteExpenseHandler} className={classes["expense-item"]}>
      <Date date={props.date} />
      <div className={classes.title}>{props.title}</div>
      <div className={classes.price}>{props.price} zł</div>
    </li>
  );
};

export default Expense;
