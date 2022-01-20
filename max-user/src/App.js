import React, { useState } from "react";
import Next from "./components/Next";
import ErrorModal from "./components/ErrorModal";
function App() {
  const [level, setlevel] = useState(false);
  const [user, setuser] = useState("");
  const [age, setage] = useState("");
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
    if (user.trim().length === 0 || age.trim().length === 0) {
      setError({ title: "Invalid input", message: "빈칸머야" });
    } else if (age < 1) {
      setError({ title: "Invalid age", message: "나이가 음수?" });
    } else {
      const data = {
        name: user,
        years: age,
        id: Math.random().toString(),
      };
      savepoint(data);
    }
    setuser("");
    setage("");
  };
  const handleuser = (event) => {
    setuser(event.target.value);
  };
  const handleage = (event) => {
    setage(event.target.value);
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
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
            <input type="text" value={user} onChange={handleuser} />
          </div>
          <div>
            <h3>Age(Years)</h3>
            <input type="number" value={age} onChange={handleage} /> <br />
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
    </div>
  );
}

export default App;
