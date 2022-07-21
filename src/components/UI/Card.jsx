import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  background-color: #ca4e79;
`;

const Card = (props) => {
  return <StyledCard className={props.className}>{props.children}</StyledCard>;
};

export default Card;
