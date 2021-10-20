import { Fragment, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Route } from "react-router-dom";
import Expenses from './expenses/Expenses';
import Incomes from "./incomes/Incomes";
import Balance from "../balance/Balance";
import { amountActions } from "../../store/amount";

import classes from "./HomePage.module.css";

// const initialState = { amount: 0 };

// function reducer(state, action) {
//   switch (action.type) {
//     case "addAmount":
//       return { amount: state.amount + action.payload };
//     case "removeAmount":
//       return { amount: state.amount - action.payload };
//     case "removeObj":
//       return { amount: 0 };
//     default:
//       throw new Error();
//   }
// }

const DemoTracker = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.amount.amount)

  const onAddAmount = (price) => {
    dispatch(amountActions.addAmount(price));
  };
  const onRemoveAmount = (price) => {
    dispatch(amountActions.removeAmount(price));
  };

  const onAddIncomeHandler = (incomeData) => {
    setIncomes((prevState) => {
      return [...prevState, { ...incomeData, id: Math.random() }];
    });
  };
  const onDeleteIncomeHandler = (id) => {
    const updatedIncome = incomes.filter((income) => income.id !== id);
    setIncomes(updatedIncome);
  };
  const onDeleteExpenseHandler = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };
  const onAddExpenseHandler = (incomeData) => {
    setExpenses((prevState) => {
      return [...prevState, { ...incomeData, id: Math.random() }];
    });
  };

  return (
    <Fragment>
      <div>
        <Balance balance={amount} />
      </div>
      <div className={classes.demoTracker}>
          <Route path="/demo-tracker">
            <Expenses
              expenses={expenses}
              onAddExpenseHandler={onAddExpenseHandler}
              onDeleteExpenseHandler={onDeleteExpenseHandler}
              setExpensesAmount={onAddAmount}
              removeExpensesAmount={onRemoveAmount}
            />
            <Incomes
              incomes={incomes}
              onAddIncomeHandler={onAddIncomeHandler}
              onDeleteIncomeHandler={onDeleteIncomeHandler}
              setIncomesAmount={onAddAmount}
              removeIncomesAmount={onRemoveAmount}
            />
          </Route>
      </div>
    </Fragment>
  );
};

export default DemoTracker;
