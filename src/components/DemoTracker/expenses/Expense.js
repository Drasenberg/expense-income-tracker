import Date from "../../date/Date";

import classes from "./Expense.module.css";

const Expense = (props) => {
  const deleteExpenseHandler = () => {
    props.onDeleteExpenseHandler(props.id);
    props.setExpensesAmount(props.price);
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
