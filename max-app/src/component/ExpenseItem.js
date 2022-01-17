import "./ExpenseItem.css";
function ExpenseItem(prop) {
  const month = prop.date.toLocaleString("en-US", { month: "long" });
  const expenseDate = new Date(2021, 2, 25);
  const expenseTite = "Car Insurance";
  const expenseAmount = 200;
  return (
    <div className="expense-item">
      <div>{expenseDate}</div>
      <div className="expense-item__description">
        <h2 className="expense-item h2">{expenseTite}</h2>
        <div className="expense-item__price">${expenseAmount}</div>
      </div>
    </div>
  );
}
export default ExpenseItem;
