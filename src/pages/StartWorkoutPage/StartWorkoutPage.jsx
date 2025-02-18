import { useState } from "react";
import { Link } from "react-router-dom";
import ExerciseModal from "../../components/ExerciseModal/ExerciseModal";
import ExerciseForm from "../../components/ExericeForm/ExericeForm";

import "./StartWorkoutPage.scss";

function StartWorkoutPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [addedExercises, setAddedExercises] = useState([]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddExercises = () => {
    setAddedExercises((prev) => [...prev, ...selectedExercises]);
    setSelectedExercises([]); // Clear selection after adding
    setShowModal(false);
  };

  return (
    <div className="start-workout">
      <h1 className="start-workout__title">Start Workout</h1>

      {showModal && (
        <ExerciseModal
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          onAdd={handleAddExercises}
          onClose={handleCloseModal}
        />
      )}

      {addedExercises.map((exercise, index) => (
        <ExerciseForm key={index} exercise={exercise} />
      ))}

      <button onClick={handleOpenModal} className="start-workout__button-add">
        Add Exercises
      </button>
      <Link to="/">
        <button className="start-workout__button-cancel">Cancel Workout</button>
      </Link>
    </div>
  );
}

export default StartWorkoutPage;
