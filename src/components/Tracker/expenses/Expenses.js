import { useState } from "react";
import Expense from "./Expense";
import ExpenseForm from "./ExpenseForm";
import Modal from "../../../UI/Modal";
import Button from "../../../UI/Button";

import classes from "./Expenses.module.css";

const Expenses = (props) => {
  const [isAdding, setIsAdding] = useState(false);

  const onDeleteExpenseHandler = (id) => {
    props.onDeleteExpenseHandler(id);
  };

  const expensesList = props.expenses.map((expense) => {
    return (
      <Expense
        key={expense.id}
        id={expense.id}
        title={expense.title}
        price={expense.price}
        date={expense.date}
        onDeleteExpenseHandler={onDeleteExpenseHandler}
        setExpensesAmount={props.removeExpensesAmount}
      />
    );
  });

  const onAddExpenseHandler = (incomeData) => {
    props.onAddExpenseHandler(incomeData);
    setIsAdding(false);
  };
  const onOpenAdding = () => {
    setIsAdding(true);
  };
  const onCloseAdding = () => {
    setIsAdding(false);
  };

  return (
    <div className={classes.expenses}>
      <h2>Wydatki</h2>
      <Button onClick={onOpenAdding}>Dodaj</Button>
      {isAdding && (
        <Modal onClose={onCloseAdding}>
          <ExpenseForm onAddExpenseHandler={onAddExpenseHandler} />
        </Modal>
      )}
      <ul>{expensesList}</ul>
    </div>
  );
};

export default Expenses;
