import React from "react";
import styled from "styled-components";

const StyledCartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #8a2b06;
  padding: 1rem 0;
  margin: 1rem 0;

  & h2 {
    margin: 0 0 0.5rem 0;
    color: #363636;
  }

  & button {
    font: inherit;
    font-weight: bold;
    font-size: 1.25rem;
    color: white;
    border: 1px solid #8a2b06;
    width: 3rem;
    text-align: center;
    border-radius: 6px;
    background-color: #513252;
    cursor: pointer;
    margin-left: 1rem;
    margin: 0.25rem;
  }

  & button:active {
    transform: scale(0.9);
    background-color: transparent;
    color: white;
  }

  @media (min-width: 768) {
    & button:hover {
      background-color: transparent;
      color: white;
    }
  }
`;

const StyledSummary = styled.div`
  width: 10rem;
  display: flex;
  align-items: center;
`;

const StyledPrice = styled.p`
  font-weight: bold;
`;

const StyledAmount = styled(StyledPrice)`
  padding: 0.25rem 0.75rem;
`;

const StyledActions = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <StyledCartItem className={props.className}>
      <div>
        <h2>{props.name}</h2>
        <StyledSummary className={props.className}>
          <StyledPrice className={props.className}>{price}</StyledPrice>
          <StyledAmount className={props.className}>
            x {props.amount}
          </StyledAmount>
        </StyledSummary>
      </div>
      <StyledActions className={props.className}>
        <button onClick={props.onAdd}>+</button>
        <button onClick={props.onRemove}>−</button>
      </StyledActions>
    </StyledCartItem>
  );
};

export default CartItem;
