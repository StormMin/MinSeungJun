import { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameisValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordisValid,
    hasError: PasswordInputHasError,
    valueChangeHandler: PasswordChangeHandler,
    inputBlurHandler: PasswordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const valid = nameInputHasError || PasswordInputHasError;
  let formIsValid = false;

  if (enteredNameisValid && enteredPasswordisValid) {
    formIsValid = true;
  }
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!enteredNameisValid || !enteredPasswordisValid) {
      return;
    }
    resetNameInput();
    resetPasswordInput();
  };
  const nameInputClasses = !nameInputHasError
    ? "form-control"
    : "form-control invalid";
  const PasswordInputClasses = !PasswordInputHasError
    ? "form-control"
    : "form-control invalid";
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          onBlur={nameBlurHandler}
          value={enteredName}
          onChange={nameChangeHandler}
          type="email"
          id="name"
        />
      </div>
      <div className={PasswordInputClasses}>
        <label htmlFor="password">Your Password</label>
        <input
          onBlur={PasswordBlurHandler}
          value={enteredPassword}
          onChange={PasswordChangeHandler}
          type="password"
          id="password"
        />
        {valid && <p>다시</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
