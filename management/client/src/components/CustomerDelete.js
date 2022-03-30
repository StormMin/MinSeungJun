import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const CustomerDelete = (props) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const deleteCustomer = async () => {
    const url = "/api/customers/" + props.id;
    await fetch(url, {
      method: "DELETE",
    });
    setOpen(false);
    props.refresh();
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} color="secondary">
        삭제
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>삭제</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            정말 지우시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={deleteCustomer}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerDelete;
