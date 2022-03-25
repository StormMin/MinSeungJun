import React from "react";

const CustomerDelete = (props) => {
  const deleteCustomer = async () => {
    const url = "/api/customers/" + props.id;
    await fetch(url, {
      method: "DELETE",
    });
    props.refresh();
  };
  return <button onClick={deleteCustomer}>삭제</button>;
};

export default CustomerDelete;
