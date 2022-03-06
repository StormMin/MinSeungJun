import React, { useState } from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [level, setlevel] = useState(false);
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setlevel(false);
  };
  const onstate = () => {
    setlevel(true);
  };

  const onstates = () => {
    setlevel(false);
  };
  return (
    <div className="new-expense">
      {!level && <button onClick={onstate}>New Expense</button>}
      {level && (
        <ExpenseForm
          cancel={onstates}
          onSaveExpenseData={saveExpenseDataHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
