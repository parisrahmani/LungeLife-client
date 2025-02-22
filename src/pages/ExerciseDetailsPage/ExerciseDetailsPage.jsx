import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To access the route parameters

import ExerciseDetails from "../../components/ExerciseDetails/ExerciseDetails";
import Header from "../../components/Header/Header";

function ExerciseDetailsPage() {
  const { id } = useParams(); // Get the id from the URL
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    // Fetch the exercise details based on the id
    const fetchExerciseDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/exercises/${id}`
        );
        const data = await response.json();
        setExercise(data);
      } catch (error) {
        console.error("Error fetching exercise details:", error);
      }
    };

    fetchExerciseDetails();
  }, [id]);

  return (
    <div>
      <Header />
      <ExerciseDetails exercise={exercise} />
    </div>
  );
}

export default ExerciseDetailsPage;
