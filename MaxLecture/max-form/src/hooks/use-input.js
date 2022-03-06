import { useReducer } from "react";
const initialize = {
  enteredValue: "",
  isTouched: false,
};
const useInput = (validateValue) => {
  const change = (state, action) => {
    if (action.type === "INPUT") {
      return { enteredValue: action.text, isTouched: state.isTouched };
    }
    if (action.type === "BLUR") {
      return { enteredValue: state.enteredValue, isTouched: true };
    }
    if (action.type === "ERROR") {
      return { enteredValue: "", isTouched: false };
    }
    return change;
  };
  const [value, dispatchvalue] = useReducer(change, initialize);
  const valueisValid = validateValue(value.enteredValue);
  const hasError = value.isTouched && !valueisValid;
  const valueChangeHandler = (event) => {
    dispatchvalue({ type: "INPUT", text: event.target.value });
  };
  const inputBlurHandler = (event) => {
    dispatchvalue({ type: "BLUR" });
  };
  const reset = () => {
    dispatchvalue({ type: "ERROR" });
  };
  return {
    value: value.enteredValue,
    isValid: valueisValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};
export default useInput;
