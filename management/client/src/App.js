import Customer from "./components/Customer";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./App.css";
function App() {
  const [customer, setCustomer] = useState([]);
  const callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };
  const componentDidMount = () => {
    callApi()
      .then((res) => setCustomer(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    componentDidMount();
  }, []);
  return (
    <Paper className="root">
      <Table className="table">
        <TableHead>
          <TableCell>번호</TableCell>
          <TableCell>프로필</TableCell>
          <TableCell>이름</TableCell>
          <TableCell>나이</TableCell>
        </TableHead>
        <TableBody>
          {customer?.map((prop) => (
            <Customer
              key={prop.id}
              name={prop.name}
              age={prop.age}
              id={prop.id}
              image={prop.image}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default App;
