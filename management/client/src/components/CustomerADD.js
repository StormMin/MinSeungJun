import React, { useState } from "react";
import { post } from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CustomerADD = (props) => {
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState();
  const [name, setName] = useState("");
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    await addCustomer().then((response) => {
      console.log(response.data);
    });
    setFile();
    setName("");
    setAge("");
    setOpen(false);
    setFilename("");
    props.refresh();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFile();
    setName("");
    setAge("");
    setFilename("");
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFilename(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };
  const addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("age", age);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  };
  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        고객 추가하기
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>고객 추가</DialogTitle>
        <DialogContent>
          <input
            hidden
            id="raised-button"
            type="file"
            accept="image/*"
            file={file}
            value={filename}
            onChange={handleFileChange}
            required
          />
          <label htmlFor="raised-button">
            <Button variant="contained" component="span" name="file">
              {filename === "" ? "프로필이미지 입력" : filename}
            </Button>
          </label>
          <br />
          <TextField
            type="text"
            value={name}
            onChange={handleName}
            label="이름"
            fullWidth
            variant="standard"
            autoFocus
            required
          />
          <TextField
            type="text"
            value={age}
            onChange={handleAge}
            label="나이"
            fullWidth
            variant="standard"
            autoFocus
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomerADD;
