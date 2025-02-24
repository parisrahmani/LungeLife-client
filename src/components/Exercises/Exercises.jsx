import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

import "./Exercises.scss";

import searchIcon from "../../assets/Icons/search-24px.svg";
import ExerciseDetails from "../../components/ExerciseDetails/ExerciseDetails";
import ExerciseProgress from "../ExerciseProgress/ExerciseProgress";

const Exercises = ({ id }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [primary_muscles, setBodyPart] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [exercises, setExercises] = useState([]);
  // const [exerciseInfo, setExerciseInfo] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  //const [showProgress, setShowProgress] = useState(false);
  const [view, setView] = useState(null);

  const leg = ["quadriceps", "hamstrings", "calves", "adductors"];
  const core = ["abdominals", "obliques", "lower back"];
  const arm = ["biceps", "triceps", "forearms"];
  const back = ["lats", "middle back", "traps"];
  const chest = ["chest"];
  const neck = ["neck"];
  const shoulders = ["shoulders"];
  const glutes = ["glutes", "abductors"];

  const getBodyPart = (muscles) => {
    if (!muscles) return "Others";

    if (muscles.some((muscle) => leg.includes(muscle))) return "Legs";
    if (muscles.some((muscle) => core.includes(muscle))) return "Core";
    if (muscles.some((muscle) => arm.includes(muscle))) return "Arms";
    if (muscles.some((muscle) => back.includes(muscle))) return "Back";
    if (muscles.some((muscle) => chest.includes(muscle))) return "Chest";
    if (muscles.some((muscle) => neck.includes(muscle))) return "Neck";
    if (muscles.some((muscle) => shoulders.includes(muscle)))
      return "Shoulders";
    if (muscles.some((muscle) => glutes.includes(muscle))) return "Glutes";

    return "Others";
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/exercises");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const bodyPartOptions = [
    { value: "", label: "Body Part" },
    { value: "Legs", label: "Legs" },
    { value: "Core", label: "Core" },
    { value: "Arms", label: "Arms" },
    { value: "Back", label: "Back" },
    { value: "Chest", label: "Chest" },
    { value: "Neck", label: "Neck" },
    { value: "Shoulders", label: "Shoulders" },
    { value: "Glutes", label: "Glutes" },
  ];

  const levelOptions = [
    { value: "", label: "Select Level" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advance", label: "Advanced" },
  ];

  const categoryOptions = [
    { value: "", label: "Category" },
    { value: "strength", label: "Strength" },
    { value: "cardio", label: "Cardio" },
    { value: "stretching", label: "Stretching" },
  ];

  const filteredExercises = exercises
    .filter((exercise) => {
      return (
        (primary_muscles
          ? getBodyPart(exercise.primary_muscles) === primary_muscles
          : true) &&
        (level ? exercise.level === level : true) &&
        (category ? exercise.category === category : true) &&
        (searchTerm
          ? exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true)
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleExerciseClick = (exerciseId) => {
    if (selectedExercise === exerciseId) {
      // If clicking the same exercise again, close everything
      setSelectedExercise(null);
      setView(null);
    } else {
      setSelectedExercise(exerciseId);
      setView(null); // Reset view when selecting a new exercise
    }
  };

  return (
    <div className="exercise">
      <div className="exercise__search">
        <input
          type="text"
          placeholder="Search exercises"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="exercise__search-input"
        />
        <img
          className="exercise__search-icon"
          src={searchIcon}
          alt="Search Icon"
        />
      </div>
      <div className="exercise__filter-exercise">
        <div className="exercise__filter-container">
          <div className="exercise__filter">
            <Select
              options={bodyPartOptions}
              value={bodyPartOptions.find(
                (option) => option.value === primary_muscles
              )}
              onChange={(selectedOption) => setBodyPart(selectedOption.value)}
              placeholder="Body Part"
              classNames={{
                control: () => "exercise__filter-item",
                menu: () => "exercise__filter-menu",
                option: () => "exercise__filter-option",
              }}
            />

            <Select
              options={categoryOptions}
              value={categoryOptions.find(
                (option) => option.value === category
              )}
              onChange={(selectedOption) => setCategory(selectedOption.value)}
              placeholder="Category"
              classNames={{
                control: () => "exercise__filter-item",
                menu: () => "exercise__filter-menu",
                option: () => "exercise__filter-option",
              }}
            />
          </div>
        </div>
        <ul className="exercise__list">
          {filteredExercises.map((exercise) => (
            <div key={exercise.id} className="exercise__container">
              <li
                className="exercise__item"
                onClick={() => handleExerciseClick(exercise.id)}
              >
                <img
                  src={`http://localhost:8080${exercise.images[0]}`}
                  alt={exercise.name}
                  className="exercise__image"
                />
                <div>
                  <h3 className="exercise__name">{exercise.name}</h3>
                </div>
              </li>
              <div className="exercise__details-section">
                {/* Show buttons when an exercise is selected */}
                {selectedExercise === exercise.id && (
                  <div className="exercise__buttons">
                    <button
                      onClick={() => setView("info")}
                      className="exercise__buttons-each"
                    >
                      Info
                    </button>
                    <button
                      onClick={() => setView("progress")}
                      className="exercise__buttons-each"
                    >
                      Progress
                    </button>
                  </div>
                )}

                <div className="exercise__options">
                  {/* Show the correct component based on button click */}
                  {selectedExercise === exercise.id && view === "info" && (
                    <ExerciseDetails exercise={exercise} />
                  )}
                  {
                    selectedExercise === exercise.id && view === "progress" && (
                      <ExerciseProgress exercise_id={exercise.id} />
                    )

                    // <Progress exercise={exercise} />
                  }
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Exercises;
