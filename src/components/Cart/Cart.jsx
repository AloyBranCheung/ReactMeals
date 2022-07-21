import React, { useContext, useState } from "react";
import styled from "styled-components";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { CircularProgress } from "@mui/material";

const StyledCartItem = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 10rem;
  overflow: auto;

  @media (min-height: 1024px) {
    max-height: 20rem;
  }
`;

const StyledTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const StyledActions = styled.div`
  text-align: right;
`;

const StyledButtons = styled.button`
  font: inherit;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.5rem 2rem;
  border-radius: 25px;
  margin-left: 1rem;
  color: white;
  background-color: ${(props) => (props.primary ? "#513252" : "#7A4069")};

  &:hover,
  &:active {
    background-color: #5a1a01;
    border-color: #5a1a01;
    color: white;
  }
`;

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const removeItemHandler = (itemId) => {
    cartCtx.removeItem(itemId);
  };
  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  // Submit to Firebase
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    // console.log(userData);
    // console.log(cartCtx.items);
    // maybe implement error handling in the future
    await fetch(
      "https://reactmeals-c9f69-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  // Display Cart Items in Cart Modal
  const cartItems = (
    <StyledCartItem>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            price={item.price}
            name={item.name}
            amount={item.amount}
            onRemove={removeItemHandler.bind(null, item.id)}
            onAdd={addItemHandler.bind(null, item)}
          >
            {item.name}
          </CartItem>
        );
      })}
    </StyledCartItem>
  );

  // Order Button Handler
  const orderHandler = () => {
    setIsCheckout(true);
  };

  // Modal Actions (close/order buttons)
  const modalActions = (
    <StyledActions>
      <StyledButtons onClick={props.onHideCart}>Close</StyledButtons>
      {hasItems && (
        <StyledButtons primary onClick={orderHandler}>
          Order
        </StyledButtons>
      )}
    </StyledActions>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <StyledTotal>
        <p>Total Amount</p>
        <p>{totalAmount}</p>
      </StyledTotal>

      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <CircularProgress />;

  const didSubmitModalContent = (
    <>
      <p>
        Successfully sent the order! You will be contact once the order is ready
        to be picked-up/delivered.
      </p>
      <StyledActions>
        <StyledButtons onClick={props.onHideCart}>Close</StyledButtons>
      </StyledActions>
    </>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
