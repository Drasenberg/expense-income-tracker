import { useState } from "react";
import classes from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const currDate = new Date().toISOString().substring(0, 10);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(currDate);
  const submitHandler = (event) => {
    event.preventDefault();
    const expense = {
      title: title,
      price: +price,
      date: new Date(date),
    };

    props.onAddExpenseHandler(expense);
    setTitle("");
    setPrice("");
    setDate(currDate);
  };

  const getTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const getPriceHandler = (event) => {
    setPrice(event.target.value);
  };
  const getDateHandler = (event) => {
    setDate(event.target.value);
  };

  let isFormValid = false;

  if (title.length > 0 && price.length > 0) {
    isFormValid = true;
  } else {
    isFormValid = false;
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Nazwa</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={getTitleHandler}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="price">Kwota</label>
        <input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={getPriceHandler}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Data</label>
        <input id="date" type="date" value={date} onChange={getDateHandler} />
      </div>
      <div className={classes.actions}>
        <button disabled={!isFormValid}>Dodaj</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
