// import React, { useState } from "react";
// import Exercises from "../../components/Exercises/Exercises";
// import "./ExerciseModal.scss";

// const ExerciseModal = ({
//   selectedExercises,
//   setSelectedExercises,
//   onAdd,
//   onClose,
// }) => {
//   const handleSelectExercise = (exercise) => {
//     setSelectedExercises(
//       (prev) =>
//         prev.some((e) => e.id === exercise.id)
//           ? prev.filter((e) => e.id !== exercise.id) // Remove if already selected
//           : [...prev, exercise] // Add if not selected
//     );
//   };

//   return (
//     <div className="modal">
//       <div className="modal__content">
//         <h2>Select Exercises</h2>
//         <div className="modal__buttons">
//           <button onClick={onClose}>Close</button>
//           <button onClick={() => onAdd(selectedExercises)}>Add</button>
//         </div>

//         <Exercises
//           onSelect={handleSelectExercise}
//           selectedExercises={selectedExercises}
//         />
//       </div>
//     </div>
//   );
// };

// export default ExerciseModal;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import "./ExerciseModal.scss";
import searchIcon from "../../assets/Icons/search-24px.svg";

const ExerciseModal = ({
  selectedExercises,
  setSelectedExercises,
  onAdd,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [primary_muscles, setBodyPart] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [exercises, setExercises] = useState([]);

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

  const handleSelectExercise = (exercise) => {
    setSelectedExercises((prev) =>
      prev.some((e) => e.id === exercise.id)
        ? prev.filter((e) => e.id !== exercise.id)
        : [...prev, exercise]
    );
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <h2>Select Exercises</h2>
        <div className="modal__buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={() => onAdd(selectedExercises)}>Add</button>
        </div>

        {/* Search and Filter */}
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
            value={categoryOptions.find((option) => option.value === category)}
            onChange={(selectedOption) => setCategory(selectedOption.value)}
            placeholder="Category"
            classNames={{
              control: () => "exercise__filter-item",
              menu: () => "exercise__filter-menu",
              option: () => "exercise__filter-option",
            }}
          />
        </div>

        {/* Exercise List */}
        <ul className="exercise__list">
          {filteredExercises.map((exercise) => (
            <li key={exercise.id} className="exercise__item">
              <input
                type="checkbox"
                className="exercise__checkbox"
                checked={selectedExercises.some((e) => e.id === exercise.id)}
                onChange={() => handleSelectExercise(exercise)}
              />
              <Link
                to={`/exercises/${exercise.id}`}
                className="image-grid__link"
              >
                <img
                  src={`http://localhost:8080${exercise.images[0]}`}
                  alt={exercise.name}
                  className="exercise__image"
                />
                <div>
                  <h3 className="exercise__name">{exercise.name}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExerciseModal;
