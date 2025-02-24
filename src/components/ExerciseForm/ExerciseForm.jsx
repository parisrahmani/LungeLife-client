import React, { useState, useEffect } from "react";

import axios from "axios";

import "./ExerciseForm.scss";

function ExerciseForm({ exercise }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [exerciseData, setExerciseData] = useState({
    user_id: "user-01",
    exercise_id: "",
    date: new Date().toISOString().split("T")[0],
    exerciseRecords: [{ weight: "", reps: 1, sets: 1, duration: "", prs: "" }],
  });

  useEffect(() => {
    if (exercise?.name) {
      setExerciseData((prev) => ({
        ...prev,
        name: exercise.name,
        exerciseRecords: prev.exerciseRecords.length
          ? prev.exerciseRecords
          : [{ weight: "", reps: 1, sets: 1, duration: "", prs: "" }],
      }));
    }
  }, [exercise]);

  const rpeLevels = ["Easy", "Moderate", "Hard", "Max Effort"];

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setExerciseData((prev) => ({
      ...prev,
      exerciseRecords: prev.exerciseRecords.map((record, i) =>
        i === index ? { ...record, [name]: value } : record
      ),
    }));
  };

  const handleAddSet = () => {
    setExerciseData((prev) => ({
      ...prev,
      exerciseRecords: [
        ...prev.exerciseRecords,
        {
          weight: "",
          reps: 1,
          sets: prev.exerciseRecords.length + 1,
          duration: "",
          prs: "",
        },
      ],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(exercise);
    console.log(exerciseData);
    console.log(exerciseData.exerciseRecords);

    const formData = {
      user_id: "user-01",
      exercise_id: exercise.id,
      date: new Date(selectedDate).toISOString().split("T")[0],
      exerciseRecords: exerciseData.exerciseRecords.map(
        ({ weight, reps, duration, prs }) => ({
          weight: weight,
          reps: reps,
          duration: duration,
          prs: prs,
        })
      ),
    };
    console.log(formData);
    try {
      const response = await fetch("http://localhost:8080/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__title">
        <h2>{exerciseData.name || "Log Exercise Record"}</h2>
      </div>
      <div className="form__header">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="form__date"
        />
        <button type="submit" className="form__submit">
          Submit
        </button>
      </div>

      <table className="form-table">
        <thead>
          <tr>
            <th>Set</th>
            <th>Reps</th>
            <th>Weight (kg)</th>
            <th>RPE</th>
            <th>Duration (min)</th>
          </tr>
        </thead>
        <tbody>
          {exerciseData.exerciseRecords.map((set, index) => (
            <tr key={index}>
              <td>{set.sets}</td>
              <td>
                <input
                  type="number"
                  name="reps"
                  value={set.reps}
                  onChange={(e) => handleChange(index, e)}
                  min="1"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="weight"
                  value={set.weight}
                  onChange={(e) => handleChange(index, e)}
                  min="0"
                />
              </td>
              <td>
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
              </td>
              <td>
                <input
                  type="number"
                  name="duration"
                  value={set.duration}
                  onChange={(e) => handleChange(index, e)}
                  min="0"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" onClick={handleAddSet} className="form__add">
        Add Set
      </button>
    </form>
  );
}

export default ExerciseForm;
