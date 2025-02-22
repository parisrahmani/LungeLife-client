import React from "react";

import Exercises from "../../components/Exercises/Exercises";
import Header from "../../components/Header/Header";

import "./ExercisePage.scss";

function ExercisePage() {
  return (
    <div>
      <Header />
      <h1 className="exercise-page__header">Exercise List</h1>
      <Exercises />
    </div>
  );
}

export default ExercisePage;
