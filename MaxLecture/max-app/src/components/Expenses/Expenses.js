import React, { useState } from "react";
import ExpensesFilter from "../NewExpense/ExpensesFilter";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
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
        <ExpensesChart expenses={filter} />
        <ExpensesList items={filter} />
      </Card>
    </div>
  );
};

export default Expenses;
