import { useState, useEffect } from "react";

import "./ExerciseHistory.scss";

const ExerciseHistory = ({ exercise_id }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!exercise_id) return;

    const fetchHistory = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:8080/api/progress/history/${exercise_id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exercise history");
        }
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [exercise_id]);

  return (
    <div className="history-table">
      {history.length > 0 ? (
        <table className="form-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Weight (Lb) </th>
              <th>Reps</th>
              <th>Duration (Sec) </th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, index) => (
              <tr key={index}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.weight ?? "N/A"}</td>
                <td>{record.reps}</td>
                <td>{record.duration ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No history available.</p>
      )}
    </div>
  );
};

export default ExerciseHistory;
