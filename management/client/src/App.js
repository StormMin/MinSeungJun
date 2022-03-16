import Customer from "./components/Customer";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./App.css";

const customer = [
  {
    id: 1,
    image:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAzMTBfOSAg%2FMDAxNjQ2OTE5NjkxMDgx.E5vVTu860ekJu4UIMFZS4Nhy0pKMFA15TuWwO_UXRrIg.rTbDWPlJjMo-qq0GY0yfe5cUAMcCluMwox86QsRkQjsg.PNG.eee200%2F20220310_224122.png&type=a340",
    name: "카리나",
    age: "24",
  },
  {
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREjhLm3dHLhkpC78uiuAmL-eJnuHMVn_pT9g&usqp=CAU",
    name: "한동숙",
    age: "34",
  },
];
function App() {
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
