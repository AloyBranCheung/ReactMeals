import React, { useContext } from "react";
import styled from "styled-components";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const StyledMealItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  color: white;

  & h3 {
    margin: 0 0 0.25rem 0;
  }
`;

const StyledPrice = styled.p`
  margin-top: 0.25rem;
  font-weight: bold;
  color: white;
  font-size: 1.25rem;
`;

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <StyledMealItem>
      <div>
        <h3>{props.name}</h3>
        <em>{props.description}</em>
        <StyledPrice>{price}</StyledPrice>
      </div>
      <MealItemForm onAddToCart={addToCartHandler} />
    </StyledMealItem>
  );
};

export default MealItem;
