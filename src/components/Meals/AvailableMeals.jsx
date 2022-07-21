import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { CircularProgress } from "@mui/material";

const StyledAvailableMeals = styled.section`
  max-width: 60rem;
  width: 90%;
  margin: 2rem auto;
  animation: meals-appear 1s ease-out forwards;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  @keyframes meals-appear {
    from {
      opacity: 0;
      transform: translateY(3rem);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://reactmeals-c9f69-default-rtdb.firebaseio.com/meals.json"
      );

      const responseData = await response.json();
      // console.log(responseData);
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      // setTimeout(() => {
      //   setMeals(loadedMeals);
      //   setIsLoading(false);
      // }, 5000);

      setMeals(loadedMeals);
      setIsLoading(false);
    };
    setIsLoading(true);

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        meal={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  if (isLoading) {
    return (
      <StyledAvailableMeals style={{ textAlign: "center" }}>
        <Card>
          <CircularProgress />
        </Card>
      </StyledAvailableMeals>
    );
  }

  if (httpError) {
    return (
      <StyledAvailableMeals style={{ textAlign: "center" }}>
        <Card>
          <p style={{ color: "white" }}>{httpError}</p>
        </Card>
      </StyledAvailableMeals>
    );
  }

  return (
    <StyledAvailableMeals>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </StyledAvailableMeals>
  );
};

export default AvailableMeals;
