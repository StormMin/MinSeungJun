import React, { useState } from "react";
import { post } from "axios";

const CustomerADD = (props) => {
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
    props.refresh();
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
    <form onSubmit={handleSubmit}>
      <h1>고객 추가</h1>
      프로필 이미지:{" "}
      <input
        type="file"
        file={file}
        value={filename}
        onChange={handleFileChange}
      />
      <br /> 이름: <input type="text" value={name} onChange={handleName} />
      <br /> 나이 : <input type="text" value={age} onChange={handleAge} />
      <button type="submit"> 제출하기</button>
    </form>
  );
};

export default CustomerADD;
