import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPaperclip } from "react-icons/fa";

import "./WorkoutTemplate.scss";

function WorkoutTemplate({ templates, reloadTempaltes, setTemplates }) {
  const [exerciseData, setExerciseData] = useState({});

  useEffect(() => {
    async function getTemplates() {
      try {
        const response = await fetch("http://localhost:8080/api/templates");
        const data = await response.json();
        console.log("Fetched data:", data);
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

  return (
    <section className="templateSection">
      <h1 className="templateSection__title">Sample Templates</h1>
      <div className="templateCard">
        <ul className="templateCard__list">
          {templates &&
            templates.map((template) => (
              <li key={template.id} className="templateCard__item">
                <Link
                  to={`/start/${template.id}`}
                  className="templateCard__link"
                >
                  <div className="templateCard__section">
                    <div className="templateCard__title">
                      <h3 className="templateCard__name">
                        {template.template_name}
                      </h3>
                      <p className="templateCard__note">
                        <div className="templateCard__note-text">
                          {template.notes}
                        </div>
                        <FaPaperclip className="templateCard__note-icon" />
                      </p>
                    </div>
                    <ul className="templateCard__exerciseList">
                      {Array.isArray(template.exercises)
                        ? template.exercises.map((exerciseId, index) => {
                            const exercise = exerciseData[exerciseId]; // Find exercise by ID
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
                    </ul>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

export default WorkoutTemplate;
