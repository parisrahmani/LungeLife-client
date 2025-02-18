import React, { useState } from "react";

function ExerciseForm() {
  const [exercise, setExercise] = useState({
    name: "",
    sets: 1,
    reps: 1,
    weight: 0,
    rpe: "Easy",
    duration: 0,
  });

  const rpeLevels = ["Easy", "Moderate", "Hard", "Max Effort"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h3>Add Exercise</h3>
      <label>
        Exercise Name:
        <input
          type="text"
          name="name"
          value={exercise.name}
          onChange={handleChange}
          placeholder="e.g., Squat"
        />
      </label>

      <label>
        Sets:
        <input
          type="number"
          name="sets"
          value={exercise.sets}
          onChange={handleChange}
          min="1"
        />
      </label>

      <label>
        Reps:
        <input
          type="number"
          name="reps"
          value={exercise.reps}
          onChange={handleChange}
          min="1"
        />
      </label>

      <label>
        Weight (kg):
        <input
          type="number"
          name="weight"
          value={exercise.weight}
          onChange={handleChange}
          min="0"
        />
      </label>

      <label>
        RPE:
        <select name="rpe" value={exercise.rpe} onChange={handleChange}>
          {rpeLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      <label>
        Duration (min):
        <input
          type="number"
          name="duration"
          value={exercise.duration}
          onChange={handleChange}
          min="0"
        />
      </label>

      <button onClick={() => console.log(exercise)}>Add Exercise</button>
    </div>
  );
}

export default ExerciseForm;
