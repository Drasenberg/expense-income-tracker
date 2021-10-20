import { useState } from "react";
import Button from "../../../UI/Button";
import classes from "./IncomeForm.module.css";

const IncomeForm = (props) => {
  const currDate = new Date().toISOString().substring(0, 10);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(currDate);
  const submitHandler = (event) => {
    event.preventDefault();

    const income = {
      title: title,
      price: +price,
      date: new Date(date),
    };

    props.onAddIncomeHandler(income);
    setTitle('');
    setPrice('');
    setDate(currDate)
  };

  const getTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const getPriceHandler = (event) => {
    console.log(event.target.value);
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
          min='0'
          value={price}
          onChange={getPriceHandler}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Data</label>
        <input id="date" type="date" value={date} onChange={getDateHandler} max={date} />
      </div>
      <div className={classes.actions}>
        <Button disabled={!isFormValid}>Dodaj</Button>
      </div>
    </form>
  );
};

export default IncomeForm;
