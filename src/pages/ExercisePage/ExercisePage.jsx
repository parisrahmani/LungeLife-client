import React from "react";

import Exercises from "../../components/Exercises/Exercises";
import Header from "../../components/Header/Header";

import "./ExercisePage.scss";

function ExercisePage() {
  return (
    <div className="exercise-page">
      <Header />
      <h1 className="exercise-page__header">Exercises Library</h1>
      <Exercises />
    </div>
  );
}

export default ExercisePage;
