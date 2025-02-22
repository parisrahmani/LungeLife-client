import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ExerciseModal from "../../components/ExerciseModal/ExerciseModal";

// import { useNavigate } from "react-router-dom";
// import WorkoutTemplate from "../WorkoutTemplate/WorkoutTemplate.jsx";

function NewTemplate({ setTemplates, setReloadTemplates }) {
  const today = new Date();
  console.log(today);

  //const [reloadTemplates, setReloadTemplates] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [newTemplate, setNewTemplate] = useState({
    user_id: "user-01",
    template_name: "",
    date: today,
    exercises: [],
    notes: "",
  });

  const handleExerciseClick = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setNewTemplate({ ...newTemplate, [e.target.name]: e.target.value });
  };

  const handleAddExercises = (exercises) => {
    setSelectedExercises(exercises);
    console.log(exercises);
    setNewTemplate({
      ...newTemplate,
      exercises: exercises.map((e) => e.name), // Join exercise names
    });
    setIsModalOpen(false);
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

      try {
        const response = await fetch("http://localhost:8080/api/templates");
        const data = await response.json();
        console.log("Fetched data:", data);
        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        console.log(sortedData);
        setTemplates(sortedData);
      } catch (err) {
        console.error("Error fetching templates:", err);
      }

      setNewTemplate({
        user_id: "user-01",
        template_name: "",
        date: today,
        exercises: [],
        notes: "",
      });
      setSelectedExercises([]);
      //WorkoutTemplate();

      //setTemplates((prev) => !prev);
    } catch (error) {
      console.error("Error adding template:", error);
    }
  };

  return (
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
        Add
      </button>
    </form>
  );
}

export default NewTemplate;
