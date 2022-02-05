import useInput from "../hooks/use-input";
const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: enteredFirstNameHasError,
    valueChangeHandler: FirstNameHandler,
    inputBlurHandler: FirstBlurHandler,
    reset: resetFirstName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: enteredLastNameHasError,
    valueChangeHandler: LastNameHandler,
    inputBlurHandler: LastBlurHandler,
    reset: resetLastName,
  } = useInput((value) => value.length > 6);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: EmailHandler,
    inputBlurHandler: EmailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;
  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }
  const formChangeHandler = (event) => {
    event.preventDefault();
    if (
      !enteredFirstNameIsValid ||
      !enteredEmailIsValid ||
      !enteredLastNameIsValid
    ) {
      return;
    }
    resetFirstName();
    resetEmail();
    resetLastName();
  };
  const FirstNameClassName = !enteredFirstNameHasError
    ? "form-control"
    : "form-control invalid";

  const LastNameClassName = !enteredLastNameHasError
    ? "form-control"
    : "form-control invalid";

  const EmailClassName = !enteredEmailHasError
    ? "form-control"
    : "form-control invalid";
  return (
    <form onSubmit={formChangeHandler}>
      <div className="control-group">
        <div className={FirstNameClassName}>
          <label htmlFor="name">First Name</label>
          <input
            onChange={FirstNameHandler}
            onBlur={FirstBlurHandler}
            value={enteredFirstName}
            type="text"
            id="name"
          />
          {enteredFirstNameHasError && <p>성다시쓰셈</p>}
        </div>
        <div className={LastNameClassName}>
          <label htmlFor="name">Last Name</label>
          <input
            onChange={LastNameHandler}
            onBlur={LastBlurHandler}
            value={enteredLastName}
            type="text"
            id="name"
          />
        </div>
        {enteredLastNameHasError && <p>이름다시쓰셈</p>}
      </div>
      <div className={EmailClassName}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          onChange={EmailHandler}
          onBlur={EmailBlurHandler}
          value={enteredEmail}
          type="text"
          id="name"
        />
        {enteredEmailHasError && <p>이메일다시쓰셈</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
