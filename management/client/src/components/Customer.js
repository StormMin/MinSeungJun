import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
function Customer(props) {
  return (
    <TableRow>
      <TableCell>{props.id}</TableCell>
      <TableCell>
        <img src={props.image} alt="profile" />
      </TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>
        <CustomerInfo age={props.age} />
      </TableCell>
    </TableRow>
  );
}

function CustomerProfile(props) {
  return (
    <div>
      <img src={props.image} alt="profile" />
      <h2>
        {props.name}({props.id})
      </h2>
    </div>
  );
}

function CustomerInfo(props) {
  return (
    <div>
      <div>{props.age}</div>
    </div>
  );
}

export default Customer;
