import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartContext from "../../store/cart-context";

const StyledHeaderCartButton = styled.button`
  cursor: pointer;
  font: inherit;
  border: none;
  background-color: #ffc18e;
  color: white;
  padding: 0.75rem 0.75rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 25px;
  font-weight: bold;
  height: 70%;
  max-width: 40%;

  &:hover,
  &:active {
    background-color: #ff8080;
  }

  &:hover .badge,
  &:active .badge {
    background-color: #ff8080;
  }

  ${(props) => {
    if (props.toggle === true) {
      return `
    animation: bump 300ms ease-out;  

    @keyframes bump {
      0% {
        transform: scale(1);
      }
      10% {
        transform: scale(0.9);
      }
      30% {
        transform: scale(1.1);
      }
      50% {
        transform: scale(1.15);
      }
      100% {
        transform: scale(1);
      }
    }`;
    }
  }}
`;

const StyledIcon = styled.span`
  width: 1.35rem;
  height: 1.35rem;
  margin-right: 0.5rem;
`;

const StyledBadge = styled.span`
  background-color: #ffdeb4;
  padding: 0.25rem 1rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  max-width: 20px;
  margin-left: 5px;
`;

const StyledCartText = styled.p`
  font-size: 0.9rem;
`;

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce((currValue, item) => {
    return currValue + item.amount;
  }, 0);

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setButtonIsHighlighted(true);
    setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);
  }, [cartCtx.items]);

  return (
    <StyledHeaderCartButton
      toggle={buttonIsHighlighted}
      onClick={props.onShowCart}
    >
      <StyledIcon>
        <ShoppingCartIcon />
      </StyledIcon>
      <StyledCartText>Your Cart</StyledCartText>
      <StyledBadge>{numberOfCartItems}</StyledBadge>
    </StyledHeaderCartButton>
  );
};

export default HeaderCartButton;
