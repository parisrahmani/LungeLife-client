import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ExerciseModal from "../../components/ExerciseModal/ExerciseModal";
import ExerciseForm from "../../components/ExerciseForm/ExerciseForm";

import "./StartWorkoutPage.scss";

function StartWorkoutPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [addedExercises, setAddedExercises] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

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

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  return (
    <div className="start-workout">
      <div className="start-workout__header">
        <h1 className="start-workout__title">Start Workout</h1>

        <div className="start-workout__timer">
          {formatTime(elapsedTime)}
          <button onClick={toggleTimer} className="start-workout__button">
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={resetTimer} className="start-workout__button reset">
            Reset
          </button>
        </div>
      </div>
      <div className="start-workout__date">
        {/* <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="start-workout__date-input"
        /> */}
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
