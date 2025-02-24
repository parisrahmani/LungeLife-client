import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPaperclip, FaTrash, FaSave, FaPencilAlt } from "react-icons/fa";

import "./WorkoutTemplate.scss";

function WorkoutTemplate({ templates, reloadTempaltes, setTemplates }) {
  const [exerciseData, setExerciseData] = useState({});
  //const [editingTemplate, setEditingTemplate] = useState(null);
  const [editingNotes, setEditingNotes] = useState(null);
  const [newNotes, setNewNotes] = useState("");

  useEffect(() => {
    async function getTemplates() {
      try {
        const response = await fetch("http://localhost:8080/api/templates");
        const data = await response.json();

        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTemplates(sortedData);
      } catch (err) {
        console.error("Error fetching templates:", err);
      }
    }

    getTemplates();
  }, [reloadTempaltes]);

  // Fetch exercises from the backend
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/exercises"); // Replace with your API
        const exercises = response.data; // Ensure backend sends { id, name, image_url }

        // Convert array to object { id: { name, image_url } }
        const exerciseMap = exercises.reduce((acc, exercise) => {
          acc[exercise.id] = exercise;
          return acc;
        }, {});

        setExerciseData(exerciseMap);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Make DELETE request to server
      await axios.delete(`http://localhost:8080/api/templates/${id}`);
      // Remove template from state after successful deletion
      setTemplates((prevTemplates) =>
        prevTemplates.filter((template) => template.id !== id)
      );
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  const handleEditNotes = (template) => {
    setEditingNotes(template.id);
    setNewNotes(template.notes);
  };

  const handleSaveNotes = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/templates/each/${id}`,
        { notes: newNotes }
      );

      if (response.status === 200) {
        // Update state with new notes if the response is successful
        setTemplates((prevTemplates) =>
          prevTemplates.map((template) =>
            template.id === id ? { ...template, notes: newNotes } : template
          )
        );
        setEditingNotes(null); // Exit edit mode
      } else {
        console.error("Failed to update notes:", response.data);
      }
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };

  return (
    <section className="templateSection">
      <h2 className="templateSection__title">Workout Templates</h2>
      <div className="templateCard">
        <ul className="templateCard__list">
          {templates &&
            templates.map((template) => (
              <li key={template.id} className="templateCard__item">
                <div className="templateCard__section">
                  <div className="templateCard__title">
                    {editingNotes === template.id ? (
                      <div className="note__new">
                        <textarea
                          value={newNotes}
                          onChange={(e) => setNewNotes(e.target.value)}
                          className="note__new-text"
                        />
                        <button
                          onClick={() => handleSaveNotes(template.id)}
                          className="note__new-save"
                        >
                          <FaSave />
                        </button>
                      </div>
                    ) : (
                      <p className="note">
                        <span className="note__text">{template.notes}</span>
                        <FaPaperclip className="note__paper-clip-icon" />
                        <button
                          className="note__edit-icon"
                          onClick={() => handleEditNotes(template)}
                        >
                          <FaPencilAlt />
                        </button>
                      </p>
                    )}

                    <h3 className="templateCard__name">
                      {template.template_name}
                    </h3>
                  </div>
                  <ul className="templateCard__exerciseList">
                    <Link
                      to={`/start/${template.id}`}
                      className="templateCard__link"
                    >
                      {Array.isArray(template.exercises)
                        ? template.exercises.map((exerciseId, index) => {
                            const exercise = exerciseData[exerciseId];
                            return (
                              <li
                                key={index}
                                className="templateCard__exerciseItem"
                              >
                                {exercise ? (
                                  <>
                                    <p>{exercise.name}</p>
                                    <img
                                      src={`http://localhost:8080${exercise.images[0]}`}
                                      alt={exercise.name}
                                      className="templateCard__exerciseImage"
                                    />
                                  </>
                                ) : (
                                  "Exercise not found"
                                )}
                              </li>
                            );
                          })
                        : "No exercises listed"}
                    </Link>
                  </ul>
                  <button
                    className="templateCard__deleteButton"
                    onClick={() => handleDelete(template.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

export default WorkoutTemplate;
