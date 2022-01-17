import React, { useState } from "react";
import ExpensesFilter from "../NewExpense/ExpensesFilter";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";
const Expenses = (props) => {
  const [year, setyear] = useState("2020");
  const onChangeHandle = (value) => {
    setyear(value);
  };
  const filter = props.items.filter((value) => {
    return value.date.getFullYear() === parseInt(year);
  });
  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter selected={year} onChangeFilter={onChangeHandle} />

        {filter.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        ))}
      </Card>
    </div>
  );
};

export default Expenses;
