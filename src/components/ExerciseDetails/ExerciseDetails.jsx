import React from "react";

import "./ExerciseDetails.scss";

function ExerciseDetails({ exercise }) {
  if (!exercise) {
    return <h3 className="exerice__loading">Loading...</h3>; // Or some fallback UI
  }

  return (
    <div className="exercise-details">
      <h1 className="exercise-details__title">{exercise.name}</h1>
      <img
        src={`http://localhost:8080${exercise.images[0]}`}
        alt={exercise.name}
        className="exercise-details__image"
      />
      <div className="exercise-details__info">
        <p>
          <strong>Equipment:</strong> {exercise.equipment}
        </p>

        {/* <p>
          <strong>Force:</strong> {exercise.force}
        </p>
        <p>
          <strong>Level:</strong> {exercise.level}
        </p>
        <p>
          <strong>Category:</strong> {exercise.category}
        </p> */}
        <p>
          <strong>Primary Muscles:</strong> {exercise.primary_muscles}
        </p>
        <p>
          <strong>Secondary Muscles:</strong> {exercise.secondary_muscles}
        </p>
        <p>
          <strong>Instructions:</strong>
        </p>
        <p>{exercise.instructions}</p>
      </div>
    </div>
  );
}

export default ExerciseDetails;
