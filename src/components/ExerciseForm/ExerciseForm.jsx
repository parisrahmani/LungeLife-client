import React, { useState, useEffect } from "react";

import "./ExerciseForm.scss";

function ExerciseForm({ exercise }) {
  const [exerciseData, setExerciseData] = useState({
    name: "",
    sets: [],
    timeElapsed: 0,
    running: false,
  });

  useEffect(() => {
    if (exercise?.name) {
      setExerciseData((prev) => ({
        ...prev,
        name: exercise.name,
        sets: prev.sets.length
          ? prev.sets
          : [{ set: 1, reps: 1, weight: 0, rpe: "Easy", duration: 0 }],
      }));
    }
  }, [exercise]);

  const rpeLevels = ["Easy", "Moderate", "Hard", "Max Effort"];

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setExerciseData((prev) => ({
      ...prev,
      sets: prev.sets.map((set, i) =>
        i === index ? { ...set, [name]: value } : set
      ),
    }));
  };

  const handleAddSet = () => {
    setExerciseData((prev) => ({
      ...prev,
      sets: [
        ...prev.sets,
        {
          set: prev.sets.length + 1,
          reps: 1,
          weight: 0,
          rpe: "Easy",
          duration: 0,
        },
      ],
    }));
  };

  return (
    <div className="form">
      <div className="form__header">
        <h3>{exerciseData.name || "Add Exercise"}</h3>
      </div>
      {/* <div>
        <p>Sets</p>
        <p>Reps</p>
        <p>Kg</p>
        <p>PRE</p>
        <p>Time</p>
      </div> */}
      <div className="form-table">
        <div className="form-table__header">
          <span className="form-table__header-item">Set</span>
          <span className="form-table__header-item">Reps</span>
          <span className="form-table__header-item">Weight (kg)</span>
          <span className="form-table__header-item">RPE</span>
          <span className="form-table__header-item">Duration (min)</span>
        </div>

        {exerciseData.sets.map((set, index) => (
          <div key={index} className="form-table__row">
            <span>{set.set}</span>
            <input
              type="number"
              name="reps"
              value={set.reps}
              onChange={(e) => handleChange(index, e)}
              min="1"
            />
            <input
              type="number"
              name="weight"
              value={set.weight}
              onChange={(e) => handleChange(index, e)}
              min="0"
            />
            <select
              name="rpe"
              value={set.rpe}
              onChange={(e) => handleChange(index, e)}
            >
              {rpeLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="duration"
              value={set.duration}
              onChange={(e) => handleChange(index, e)}
              min="0"
            />
          </div>
        ))}
      </div>

      <button onClick={handleAddSet} className="form-table__button-set">
        Add Set
      </button>
    </div>
  );
}

export default ExerciseForm;
