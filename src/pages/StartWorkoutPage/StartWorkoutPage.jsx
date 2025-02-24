import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import ExerciseModal from "../../components/ExerciseModal/ExerciseModal";
import ExerciseForm from "../../components/ExerciseForm/ExerciseForm";
import Header from "../../components/Header/Header";
import Timer from "../../components/Timer/Timer";

import "./StartWorkoutPage.scss";

function StartWorkoutPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [addedExercises, setAddedExercises] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function getTemplateExercise() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/templates/${id}`
        );
        console.log(response.data);
        setAddedExercises(response.data);
      } catch (err) {
        console.error("Error fetching template:", err);
      }
    }

    if (id) {
      getTemplateExercise();
    } else {
      setAddedExercises([]);
    }
  }, [id]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddExercises = () => {
    setAddedExercises((prev) => [...prev, ...selectedExercises]);
    setSelectedExercises([]);
    setShowModal(false);
  };

  return (
    <div className="start-workout">
      <Header />
      <div className="start-workout__header">
        <h1 className="start-workout__title"> </h1>
        <Timer />
      </div>

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
      <div className="start-workout__button-container">
        <button onClick={handleOpenModal} className="start-workout__button-add">
          Add Exercises
        </button>
        <Link to="/">
          <button className="start-workout__button-cancel">
            Cancel Workout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default StartWorkoutPage;
