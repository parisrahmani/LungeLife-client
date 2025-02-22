import React, { useState, useEffect } from "react";

import axios from "axios";

import "./ExerciseForm.scss";

function ExerciseForm({ exercise }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [exerciseData, setExerciseData] = useState({
    user_id: "user-01",
    exercise_id: "",
    date: "",
    exerciseRecords: [{ weight: "", reps: "", sets: 1, duration: "", prs: "" }],
  });

  useEffect(() => {
    if (exercise?.name) {
      setExerciseData((prev) => ({
        ...prev,
        name: exercise.name,
        exerciseRecords: prev.exerciseRecords.length
          ? prev.exerciseRecords
          : [{ weight: "", reps: "", sets: 1, duration: "", prs: "" }],
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
          reps: "",
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
    console.log(exerciseData.exerciseRecords);

    const formData = {
      user_id: "user-01",
      exercise_id: exercise.id,
      date: selectedDate,
      exerciseRecords: exerciseData.exerciseRecords.map(
        ({ weight, reps, duration, prs }) => ({
          weight: weight,
          reps: reps,
          duration: duration,
          prs: prs,
        })
      ),
    };

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
      <div className="form__header">
        <h3>{exerciseData.name || "Add Exercise"}</h3>
      </div>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="start-workout__date-input"
      />
      <button type="submit">Submit</button>

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

      {/* <div className="form-table">
        <div className="form-table__header">
          <span className="form-table__header-item">Set</span>
          <span className="form-table__header-item">Reps</span>
          <span className="form-table__header-item">Weight (kg)</span>
          <span className="form-table__header-item">RPE</span>
          <span className="form-table__header-item">Duration (min)</span>
        </div>

        {exerciseData.exerciseRecords.map((set, index) => (
          <div key={index} className="form-table__row">
            <span>{set.sets}</span>
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
      </div> */}

      <button
        type="button"
        onClick={handleAddSet}
        className="form-table__button-set"
      >
        Add Set
      </button>
    </form>
  );
}

export default ExerciseForm;

// const [exercises, setExercises] = useState([
//   {
//     user_id: "user-01",
//     exercise_id: "",
//     date: "",
//     exerciseRecords: [
//       { weight: "", reps: "", sets: 1, duration: "", prs: "" },
//     ],
//   },
// ]);

// const [isSubmitting, setIsSubmitting] = useState(false);
// const [submitSuccess, setSubmitSuccess] = useState(null);
// const [error, setError] = useState(null);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   console.log(exercises);
//   setIsSubmitting(true);
//   setSubmitSuccess(null);
//   setError(null);

//   try {
//     const response = await fetch("http://localhost:8080/api/progress", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ exercises }),
//     });

//     if (!response.ok) throw new Error("Failed to submit exercise log");

//     setSubmitSuccess("Exercise logs submitted successfully!");
//     setExerciseData({
//       user_id: "user-01",
//       exercise_id: "",
//       date: "",
//       exerciseRecords: [{ weight: "", reps: "", duration: "", prs: "" }],
//     });
//   } catch (err) {
//     setError(err.message);
//   } finally {
//     setIsSubmitting(false);
//   }
// };
