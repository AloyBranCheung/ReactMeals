import styled from "styled-components";
import { useState, useRef } from "react";

// ****************** Start Styles ******************
const StyledForm = styled.form`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledControl = styled.div`
  margin-bottom: 0.5rem;
  max-height: 15rem;
  overflow: auto;

  & label {
    font-weight: bold;
    margin-bottom: 0.25rem;
    display: block;
  }

  & input {
    font: inherit;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 20rem;
    max-width: 100%;
  }
`;

const StyledAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1rem;
  margin-top: 1rem;
`;

const StyledButton = styled.button`
  font: inherit;
  color: white;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#7a4069" : "palevioletred")};
  border: ${(props) => (props.submit ? "1px solid palevioletred" : "none")};
  border-radius: 25px;
  padding: 0.5rem 2rem;
  margin-left: 1rem;
  margin-top: 1rem;
  opacity: ${(props) => (props.primary ? "" : "0.5")};

  &:hover,
  &:active {
    background-color: ${(props) =>
      props.primary ? "palevioletred" : "#7a4069"};
  }
`;

const StyledInvalidLabel = styled.label`
  color: #ca3e51;
`;
const StyledInvalidInput = styled.input`
  border-color: #aa0b20;
  background-color: #ffeff1;
`;
// ****************** End Styles ******************
const isEmpty = (value) => value.trim().length === "";
const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: false,
    street: false,
    city: false,
    postalCode: false,
  });
  const name = useRef();
  const street = useRef();
  const city = useRef();
  const postal = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // or useRef() e.g. nameRef = useRef(); link name input with ref={nameRef};
    // then nameRef.current.value to read the value
    // customHook for validation or use Formix

    const nameValid = !isEmpty(name.current.value);
    const streetValid = !isEmpty(street.current.value);
    const cityValid = !isEmpty(city.current.value);
    const postalValid = !isNotFiveChars(postal.current.value);

    setFormInputsValidity({
      name: nameValid,
      street: streetValid,
      city: cityValid,
      postalCode: postalValid,
    });

    let formIsValid = nameValid && streetValid && cityValid && postalValid;
    if (!formIsValid) {
    }

    // Submit Cart Data
    props.onConfirm({
      name: name.current.value,
      street: street.current.value,
      city: city.current.value,
      postalCode: postal.current.value,
    });
  };

  // type="button" prevents form submssion with button
  return (
    <StyledForm onSubmit={confirmHandler}>
      <StyledControl>
        {!formInputsValidity.name ? (
          <StyledInvalidLabel htmlFor="name">Your Name</StyledInvalidLabel>
        ) : (
          <label htmlFor="name">Your Name</label>
        )}
        {!formInputsValidity.name ? (
          <StyledInvalidInput type="text" id="name" ref={name} />
        ) : (
          <input type="text" id="name" ref={name} />
        )}
        {!formInputsValidity.name && <p>Please input correct name.</p>}

        {!formInputsValidity.street ? (
          <StyledInvalidLabel htmlFor="street">Street</StyledInvalidLabel>
        ) : (
          <label htmlFor="street">Street</label>
        )}
        {!formInputsValidity.street ? (
          <StyledInvalidInput type="text" id="street" ref={street} />
        ) : (
          <input type="text" id="street" ref={street} />
        )}
        {!formInputsValidity.street && <p>Please input correct street.</p>}

        {!formInputsValidity.postalCode ? (
          <StyledInvalidLabel htmlFor="postal">Postal Code</StyledInvalidLabel>
        ) : (
          <label htmlFor="postal">Postal Code</label>
        )}
        {!formInputsValidity.postalCode ? (
          <StyledInvalidInput type="text" id="postal" ref={postal} />
        ) : (
          <input type="text" id="postal" ref={postal} />
        )}
        {!formInputsValidity.postalCode && (
          <p>Please input correct postal code.</p>
        )}

        {!formInputsValidity.city ? (
          <StyledInvalidLabel htmlFor="city">City</StyledInvalidLabel>
        ) : (
          <label htmlFor="city">City</label>
        )}
        {!formInputsValidity.city ? (
          <StyledInvalidInput type="text" id="city" ref={city} />
        ) : (
          <input type="text" id="city" ref={city} />
        )}
        {!formInputsValidity.city && <p>Please input correct city.</p>}

        <StyledAction>
          <StyledButton type="button" onClick={props.onCancel}>
            Cancel
          </StyledButton>
          <StyledButton primary submit>
            Confirm
          </StyledButton>
        </StyledAction>
      </StyledControl>
    </StyledForm>
  );
};

export default Checkout;
