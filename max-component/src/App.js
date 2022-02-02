// import React, { useCallback, useState } from "react";

// import "./App.css";
// import DemoOutput from "./components/Demo/DemoOutput";
// import Button from "./components/UI/Button/Button";

// function App() {
//   const [showParagraph, setshowParagraph] = useState(false);
//   const [allowToggle, setAllowToggle] = useState(false);
//   console.log("APP RUNNING!");
//   const toggleParagraphHandler = useCallback(() => {
//     if (allowToggle) {
//       setshowParagraph((prev) => !prev);
//     }
//   }, [allowToggle]);
//   const allowToggleHandler = () => {
//     setAllowToggle(true);
//   };
//   return (
//     <div className="app">
//       <h1>Hi there!</h1>
//       <DemoOutput show={showParagraph}></DemoOutput>
//       <Button onClick={allowToggleHandler}>Allow Toggling</Button>
//       <Button onClick={toggleParagraphHandler}>show Paragph</Button>
//     </div>
//   );
// }

// export default App;

import React, { useState, useCallback, useMemo } from "react";

import "./App.css";
import DemoList from "./components/Demo/DemoList";
import Button from "./components/UI/Button/Button";

function App() {
  const [listTitle, setListTitle] = useState("My List");

  const changeTitleHandler = useCallback(() => {
    setListTitle("New Title");
  }, []);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;
