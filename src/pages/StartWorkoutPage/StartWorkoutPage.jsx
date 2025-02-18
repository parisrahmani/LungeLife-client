// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// import ExerciseForm from "../../components/ExericeForm/ExericeForm";

// function StartWorkoutPage() {
//   return (
//     <div>
//       {/* <ExerciseForm /> */}
//       <h1>StartWorkoutPage</h1>

//       <button>Add Exercises</button>

//       <Link to="/">
//         <button>Cancel Workout</button>
//       </Link>
//     </div>
//   );
// }

// export default StartWorkoutPage;

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import ExerciseForm from "../../components/ExericeForm/ExericeForm";
// import ExerciseModal from "../../components/ExerciseModal/ExerciseModal";

// function StartWorkoutPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedExercises, setSelectedExercises] = useState([]);

//   const handleAddExercises = (exercises) => {
//     setSelectedExercises([...selectedExercises, ...exercises]);
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       <h1>Start Workout</h1>
//       <button onClick={() => setIsModalOpen(true)}>Add Exercises</button>
//       <Link to="/">
//         <button>Cancel Workout</button>
//       </Link>

//       {selectedExercises.map((exercise) => (
//         <ExerciseForm key={exercise.id} exercise={exercise} />
//       ))}

//       {isModalOpen && (
//         <ExerciseModal
//           selectedExercises={selectedExercises}
//           setSelectedExercises={setSelectedExercises}
//           //onAdd={handleAddExercises}
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default StartWorkoutPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import ExerciseModal from "../../components/ExerciseModal/ExerciseModal";
import ExerciseForm from "../../components/ExericeForm/ExericeForm";

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
    <div>
      <h1>Start Workout</h1>
      <button onClick={handleOpenModal}>Add Exercises</button>
      <Link to="/">
        <button>Cancel Workout</button>
      </Link>

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
    </div>
  );
}

export default StartWorkoutPage;
