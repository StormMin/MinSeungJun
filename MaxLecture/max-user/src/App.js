import React, { useRef, useState } from "react";
import Next from "./components/Next";
import ErrorModal from "./components/ErrorModal";
import Wrapper from "./components/Helper/Wrapper";
function App() {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const [level, setlevel] = useState(false);
  const [result, setresult] = useState("");
  const [error, setError] = useState();
  const savepoint = (data) => {
    setresult((prevdata) => {
      return [data, ...prevdata];
    });
    setlevel(true);
  };
  const handlesubmit = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredage = ageInputRef.current.value;
    if (enteredName.length === 0 || enteredage.length === 0) {
      setError({ title: "Invalid input", message: "빈칸머야" });
    } else if (enteredage < 1) {
      setError({ title: "Invalid age", message: "나이가 음수?" });
    } else {
      const data = {
        name: enteredName,
        years: enteredage,
        id: Math.random().toString(),
      };
      savepoint(data);
    }
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <div>
        <form onSubmit={handlesubmit}>
          <div>
            <h3>Username</h3>
            <input type="text" ref={nameInputRef} />
          </div>
          <div>
            <h3>Age(Years)</h3>
            <input type="number" ref={ageInputRef} /> <br />
          </div>
          <button type="submit">Add User</button>
        </form>
        <div>
          {level === true ? (
            <div>
              {result.map((ans) => (
                <Next name={ans.name} age={ans.years} key={Math.random()} />
              ))}
            </div>
          ) : null}
          {/* {result.map((ans) => (
          <Next name={ans.name} age={ans.years} id={ans.id} />
        ))} */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
