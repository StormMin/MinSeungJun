import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setkeyword] = useState("");
  const onChange = (event) => setkeyword(event.target.value);
  const onClick = () => setValue((prev) => prev + 1);
  console.log("i run");
  useEffect(() => {
    console.log("call the api");
  }, []);
  useEffect(() => {
    console.log("call the api");
  }, [keyword]);
  return (
    <div className={styles.title}>
      <h1>{counter}</h1>
      <input
        type="text"
        placeholder="Wirte down"
        onChange={onChange}
        value={keyword}
      ></input>
      <Button text={"continue"} onClick={onClick}></Button>
    </div>
  );
}

export default App;
