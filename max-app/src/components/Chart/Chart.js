import React from "react";
import ChartBar from "./ChartBar";
import "./Chart.css";
const Chart = (props) => {
  const expenseMax = props.dataPoints.map((expense) => expense.value);
  const Max = Math.max(...expenseMax);
  return (
    <div className="chart">
      {props.dataPoints.map((dataPoints) => (
        <ChartBar
          key={dataPoints.label}
          value={dataPoints.value}
          maxValue={Max}
          label={dataPoints.label}
        />
      ))}
    </div>
  );
};
export default Chart;
