import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Exercises.scss";

import searchIcon from "../../assets/Icons/search-24px.svg";

const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [primary_muscles, setBodyPart] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

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

  const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  // const paginatedExercises = filteredExercises.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );

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
          className="searchForm__search-icon"
          src={searchIcon}
          alt="Search Icon"
        />

        {/* <Link> */}
        {/* <img
            className="searchForm__search-icon"
            src={searchIcon}
            alt="Search Icon"
          /> */}
        {/* <button className="searchForm__button searchForm__button--primary">
            Search
          </button> */}
        {/* </Link> */}
      </div>

      <div>
        <select
          value={primary_muscles}
          onChange={(e) => setBodyPart(e.target.value)}
        >
          <option value="">Select Body Part</option>
          <option value="Legs">Legs</option>
          <option value="Core">Core</option>
          <option value="Arms">Arms</option>
          <option value="Back">Back</option>
          <option value="Chest">Chest</option>
          <option value="Neck">Neck</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Glutes">Glutes</option>
        </select>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">Select Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advance">Advance</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
          <option value="stretching">Stretch</option>
        </select>
      </div>
      <ul className="exercise__list">
        {filteredExercises.map((exercise) => (
          <li key={exercise.id} className="exercise__item">
            <img
              src={`http://localhost:8080${exercise.images[0]}`}
              alt={exercise.name}
              className="exercise__image"
            />
            <div>
              <h3 className="exercise__name">{exercise.name}</h3>
            </div>
          </li>
        ))}
      </ul>
      {/* <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Exercises;
