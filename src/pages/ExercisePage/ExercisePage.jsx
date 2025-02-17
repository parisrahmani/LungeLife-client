import React from "react";
import Exercises from "../../components/Exercises/Exercises";

import "./ExercisePage.scss";

function ExercisePage() {
  return (
    <div>
      <h1 className="exercise-page__header">Exercise List</h1>
      <Exercises />
    </div>
  );
}

export default ExercisePage;
