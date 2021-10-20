import { useState } from "react";
import Income from "./Income";
import IncomeForm from "./IncomeForm";
import Button from "../../../UI/Button";
import Modal from "../../../UI/Modal";

import classes from "./Incomes.module.css";


const Incomes = (props) => {
  const [isAdding, setIsAdding] = useState(false);

  const onDeleteIncomeHandler = (id) => {
    props.onDeleteIncomeHandler(id);
  };


  const incomesList = props.incomes.map((income) => {
    return (
      <Income
        key={income.id}
        id={income.id}
        title={income.title}
        price={income.price}
        date={income.date}
        onDeleteIncomeHandler={onDeleteIncomeHandler}
        removeIncomesAmount={props.removeIncomesAmount}
      />
    );
  });

  const onAddIncomeHandler = (incomeData) => {
    props.onAddIncomeHandler(incomeData);
    props.setIncomesAmount(incomeData.price)
    setIsAdding(false);
  };
  const onOpenAdding = () => {
    setIsAdding(true);
  };
  const onCloseAdding = () => {
    setIsAdding(false);
  };

  return (
    <div className={classes.incomes}>
      <h2>Przychody</h2>
      <Button onClick={onOpenAdding}>Dodaj</Button>
      {isAdding && (
        <Modal onClose={onCloseAdding}>
          <IncomeForm onAddIncomeHandler={onAddIncomeHandler} />
        </Modal>
      )}
      <ul>{incomesList}</ul>
    </div>
  );
};

export default Incomes;
