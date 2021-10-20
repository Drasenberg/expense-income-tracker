import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Expenses from "./expenses/Expenses";
import Incomes from "./incomes/Incomes";
import Balance from "../balance/Balance";
import { Switch, useHistory } from "react-router";

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

const Tracker = () => {
  const accountId = useSelector((state) => state.auth.accountId);
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState();
  const axios = require("axios").default;
  const history = useHistory();

  const linkIncomes =
    "https://sledzenie-wydatkow-default-rtdb.firebaseio.com/" +
    accountId +
    "/incomes.json";
  const amountLink =
    "https://sledzenie-wydatkow-default-rtdb.firebaseio.com/" +
    accountId +
    "/amount.json";
  const linkExpense =
    "https://sledzenie-wydatkow-default-rtdb.firebaseio.com/" +
    accountId +
    "/expenses.json";

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(amountLink).then((response) => {
        const amountRecived = response.data.amount;
        setAmount(amountRecived);
      });
      await axios.get(linkIncomes).then((response) => {
        const data = response.data;
        const loadedIncomes = [];

        for (const key in data) {
          loadedIncomes.push({
            id: key,
            date: new Date(data[key].date),
            price: data[key].price,
            title: data[key].title,
          });
        }
        setIncomes(loadedIncomes);
      });
      await axios.get(linkExpense).then((response) => {
        const data = response.data;
        const loadedExpenses = [];

        for (const key in data) {
          loadedExpenses.push({
            id: key,
            date: new Date(data[key].date),
            price: data[key].price,
            title: data[key].title,
          });
        }
        setExpenses(loadedExpenses);
      });
    };
    fetchData().catch((error) => {
      console.log(error);
    });
  }, [axios, linkIncomes, amountLink, amount, linkExpense, history]);

  const onRemoveAmount = async (price) => {
    const updatedAmount = amount - price;
    console.log(updatedAmount);
    await axios.put(amountLink, { amount: updatedAmount });
    await axios.get(amountLink).then((response) => {
      const amountRecived = response.data.amount;
      setAmount(amountRecived);
    });
  };
  const onAddIncomeHandler = async (incomeData) => {
    console.log(amount);
    const loadedIncomes = [];
    await axios.post(linkIncomes, incomeData);
    const updatedAmount = amount + incomeData.price;
    await axios.put(amountLink, { amount: updatedAmount });
    await axios.get(amountLink).then((response) => {
      const amountRecived = response.data.amount;
      const amountRevicedFixed = parseFloat(amountRecived).toFixed(2);
      setAmount(amountRevicedFixed);
    });

    await axios.get(linkIncomes).then((response) => {
      const data = response.data;

      for (const key in data) {
        loadedIncomes.push({
          id: key,
          date: new Date(data[key].date),
          price: data[key].price,
          title: data[key].title,
        });
      }
      setIncomes(loadedIncomes);
    });
  };
  const onDeleteIncomeHandler = async (id) => {
    const loadedIncomes = [];
    const incomeDeleteLink =
      "https://sledzenie-wydatkow-default-rtdb.firebaseio.com/" +
      accountId +
      "/incomes/" +
      id +
      ".json";
    await axios.delete(incomeDeleteLink);
    await axios.get(linkIncomes).then((response) => {
      const data = response.data;

      for (const key in data) {
        loadedIncomes.push({
          id: key,
          date: new Date(data[key].date),
          price: data[key].price,
          title: data[key].title,
        });
      }
      setIncomes(loadedIncomes);
    });
  };
  const onDeleteExpenseHandler = async (id) => {
    const loadedExpenses = [];
    const incomeDeleteLink =
      "https://sledzenie-wydatkow-default-rtdb.firebaseio.com/" +
      accountId +
      "/expenses/" +
      id +
      ".json";
    await axios.delete(incomeDeleteLink);
    await axios.get(linkIncomes).then((response) => {
      const data = response.data;

      for (const key in data) {
        loadedExpenses.push({
          id: key,
          date: new Date(data[key].date),
          price: data[key].price,
          title: data[key].title,
        });
      }
      setIncomes(loadedExpenses);
    });
  };
  const onAddExpenseHandler = async (incomeData) => {
    const loadedExpenses = [];
    await axios.post(linkExpense, incomeData);
    const updatedAmount = amount - incomeData.price;
    await axios.put(amountLink, { amount: updatedAmount });
    await axios.get(amountLink).then((response) => {
      const amountRecived = response.data.amount;
      const amountRevicedFixed = parseFloat(amountRecived).toFixed(2);
      setAmount(amountRevicedFixed);
    });

    await axios.get(linkExpense).then((response) => {
      const data = response.data;

      for (const key in data) {
        loadedExpenses.push({
          id: key,
          date: new Date(data[key].date),
          price: data[key].price,
          title: data[key].title,
        });
      }
      setIncomes(loadedExpenses);
    });
  };

  return (
    <Fragment>
      <div>
        <Balance balance={amount} />
      </div>
      <div className={classes.demoTracker}>
        <Switch>
          <Route path="/tracker">
            <Expenses
              expenses={expenses}
              onAddExpenseHandler={onAddExpenseHandler}
              onDeleteExpenseHandler={onDeleteExpenseHandler}
              removeExpensesAmount={onRemoveAmount}
            />
            <Incomes
              incomes={incomes}
              onAddIncomeHandler={onAddIncomeHandler}
              onDeleteIncomeHandler={onDeleteIncomeHandler}
              removeIncomesAmount={onRemoveAmount}
            />
          </Route>
        </Switch> 
      </div>
    </Fragment>
  );
};

export default Tracker;
