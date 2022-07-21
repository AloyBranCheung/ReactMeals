import React, { useRef, useState } from "react";
import styled from "styled-components";
import Input from "../../UI/Input";
import { v4 as uuidv4 } from "uuid";

const StyledMealItemForm = styled.form`
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled.button`
  font: inherit;
  cursor: pointer;
  background-color: #ffc18e;
  border: 1px solid #ffc18e;
  color: white;
  padding: 0.25rem 2rem;
  border-radius: 20px;
  font-weight: bold;
  box-shadow: 2.5px 2.5px 5px rgba(0, 0, 0, 0.4);
  margin-bottom: 1rem;

  &:hover {
    background-color: #ff8080;
    border-color: #ff8080;
  }
  &:active {
    transform: scale(0.9);
    box-shadow: 1px 1px 2.5px rgba(0, 0, 0, 0.2);
  }
`;

const StyledError = styled.p`
  color: red;
  font-size: 0.7rem;
`;

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      alert("Invalid Amount.");
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <StyledMealItemForm onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: uuidv4().toString(),
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <StyledButton>+ Add</StyledButton>
      {!amountIsValid && (
        <StyledError>Please enter a valid amount (1-5).</StyledError>
      )}
    </StyledMealItemForm>
  );
};

export default MealItemForm;
