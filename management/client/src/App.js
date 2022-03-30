import Customer from "./components/Customer";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loading from "./UI/Loading";
import CustomerADD from "./components/CustomerADD";
import AppBars from "./UI/AppBars";
import "./App.css";

function App() {
  const [customer, setCustomer] = useState([]);
  const [search, setSearch] = useState("");
  const callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };
  const componentDidMount = async () => {
    await callApi()
      .then((res) => setCustomer(res))
      .catch((err) => console.log(err));
    console.log("hi");
  };
  useEffect(() => {
    componentDidMount();
  }, []);
  const refresh = () => {
    callApi()
      .then((res) => setCustomer(res))
      .catch((err) => console.log(err));
    console.log("hi");
  };
  const handleValueChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {};
  const cellList = ["번호", "프로필", "이름", "나이", "설정"];
  return (
    <>
      <AppBars />
      <div className="add">
        <CustomerADD refresh={refresh} />
      </div>
      <Paper className="root">
        <Table className="table">
          <TableHead>
            {cellList.map((c) => {
              return <TableCell>{c}</TableCell>;
            })}
          </TableHead>
          <TableBody>
            {console.log("hi")}
            {customer ? (
              customer?.map((prop) => (
                <Customer
                  key={prop.Customers_id}
                  name={prop.name}
                  age={prop.age}
                  id={prop.Customers_id}
                  image={prop.image_url}
                  refresh={refresh}
                />
              ))
            ) : (
              <Loading />
            )}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default App;
