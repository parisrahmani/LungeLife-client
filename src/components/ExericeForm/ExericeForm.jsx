import React, { useState, useEffect } from "react";

function ExerciseForm({ exercise }) {
  const [exerciseData, setExerciseData] = useState({
    name: "",
    sets: [],
    timeElapsed: 0,
    running: false,
  });
  //   { name: "",
  //   sets: 1,
  //   reps: 1,
  //   weight: 0,
  //   rpe: "Easy",
  //   duration: 0,
  // });

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

  const handleToggleTimer = () => {
    if (!exerciseData.running) {
      // Start the timer
      const intervalId = setInterval(() => {
        setExerciseData((prev) => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1,
        }));
      }, 1000);
      setExerciseData((prev) => ({ ...prev, running: true, intervalId }));
    } else {
      // Stop the timer
      clearInterval(exerciseData.intervalId);
      setExerciseData((prev) => ({ ...prev, running: false }));
    }
  };

  return (
    <div className="exercise-form">
      <div className="exercise-header">
        <h3>{exerciseData.name || "Add Exercise"}</h3>
        <button onClick={handleToggleTimer}>
          {exerciseData.running
            ? `⏸ ${exerciseData.timeElapsed}s`
            : `▶️ ${exerciseData.timeElapsed}s`}
        </button>
      </div>
      {/* <div>
        <p>Sets</p>
        <p>Reps</p>
        <p>Kg</p>
        <p>PRE</p>
        <p>Time</p>
      </div> */}
      <div className="exercise-table">
        <div className="table-header">
          <span>Set</span>
          <span>Reps</span>
          <span>Weight (kg)</span>
          <span>RPE</span>
          <span>Duration (min)</span>
        </div>

        {exerciseData.sets.map((set, index) => (
          <div key={index} className="table-row">
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

      <button onClick={handleAddSet}>Add Set</button>
    </div>
  );
}

export default ExerciseForm;
