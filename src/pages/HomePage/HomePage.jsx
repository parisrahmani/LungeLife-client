import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ExerciseModal from "../../components/ExerciseModal/ExerciseModal";
import WorkoutTemplate from "../../components/WorkoutTemplate/WorkoutTemplate";

import { useNavigate } from "react-router-dom";
import "./HomePage.scss";

function Homepage() {
  //const navigate = useNavigate();

  //const [templates, setTemplates] = useState([]);
  const [reloadTemplates, setReloadTemplates] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [newTemplate, setNewTemplate] = useState({
    user_id: "user-01", // Replace with actual user ID
    template_name: "",
    date: "",
    exercises: [],
    notes: "",
  });

  const handleExerciseClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleChange = (e) => {
    setNewTemplate({ ...newTemplate, [e.target.name]: e.target.value });
  };

  const handleAddExercises = (exercises) => {
    setSelectedExercises(exercises);
    setNewTemplate({
      ...newTemplate,
      exercises: exercises.map((e) => e.name), // Join exercise names
    });
    setIsModalOpen(false); // Close the modal after adding
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...newTemplate,
      exercises: newTemplate.exercises,
    };

    try {
      const res = await fetch("http://localhost:8080/api/templates/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      console.log("Server response:", data);

      setReloadTemplates((prev) => !prev);
    } catch (error) {
      console.error("Error adding template:", error);
    }
  };

  return (
    <div className="newSession">
      <Link to="/start">
        <button className="newSession__start-exercise-button">
          {" "}
          Start a new workout
        </button>
      </Link>
      {/* <h1>Add new session</h1> */}
      <form onSubmit={handleSubmit} className="newSession__form">
        <input
          type="text"
          name="template_name"
          placeholder="Template Name"
          value={newTemplate.template_name}
          onChange={handleChange}
          required
          className="newSession__input newSession__input--name"
        />
        <input
          type="date"
          name="date"
          value={newTemplate.date}
          onChange={handleChange}
          required
          className="newSession__input newSession__input--date"
        />
        <input
          type="text"
          name="exercises"
          placeholder="Exercise"
          value={newTemplate.exercises.join(", ")}
          onChange={handleChange}
          readOnly
          className="newSession__input newSession__input--exercises"
          onClick={handleExerciseClick}
        />
        {isModalOpen && (
          <ExerciseModal
            selectedExercises={selectedExercises}
            setSelectedExercises={setSelectedExercises}
            onAdd={handleAddExercises}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={newTemplate.notes}
          onChange={handleChange}
          className="newSession__input newSession__input--notes"
        />
        <button type="submit" className="newSession__button">
          Add Session
        </button>
      </form>
      <WorkoutTemplate reloadTemplates={{ reloadTemplates }} />
    </div>
  );
}

export default Homepage;
