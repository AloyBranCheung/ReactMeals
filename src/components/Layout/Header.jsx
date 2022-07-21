import React from "react";
import styled from "styled-components";
import mealImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  background-color: #513252;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 10;
`;

const StyledImg = styled.div`
  width: 100%;
  height: 25rem;
  z-index: 0;
  overflow: hidden;

  & img {
    width: 110%;
    height: 100%;
    object-fit: cover;
    transform: rotateZ(-5deg) translateY(-4rem) translateX(-1rem);
  }
`;

const Header = (props) => {
  return (
    <>
      <StyledHeader>
        <h1>ReactMeals</h1>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </StyledHeader>
      <StyledImg>
        <img src={mealImage} alt="mealImage.jpg" />
      </StyledImg>
    </>
  );
};

export default Header;
