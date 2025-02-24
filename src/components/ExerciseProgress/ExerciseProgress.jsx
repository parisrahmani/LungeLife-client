import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const ExerciseChart = ({ exercise_id }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!exercise_id || exercise_id.trim() === "") return;

    const fetchChartData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:8080/api/progress/exercise/${exercise_id.trim()}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch progress data (${response.status})`);
        }

        const data = await response.json();

        const labels = data.map((entry) =>
          new Date(entry.date).toLocaleDateString()
        );
        const normalizedWeight = data.map(
          (entry) => entry.Normalized_Weight ?? 0
        );
        const normalizedTime = data.map((entry) => entry.Normalized_Time ?? 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "Normalized Weight",
              data: normalizedWeight,
              borderColor: "rgba(255, 165, 0, 1)",
              backgroundColor: "rgba(255, 165, 0, 0.2)",
              fill: true,
              tension: 0.4,
            },
            {
              label: "Normalized Time",
              data: normalizedTime,
              borderColor: "rgba(34, 139, 34, 1)",
              backgroundColor: "rgba(34, 139, 34, 0.2)",
              fill: true,
              tension: 0.4,
            },
          ],
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [exercise_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#000",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#000",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "#000",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.2)",
        },
      },
    },
  };

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "10px" }}>
      <h3 style={{ color: "#000", textAlign: "center" }}>
        Exercise Progress Chart
      </h3>
      {chartData ? (
        <div style={{ width: "100%", height: "300px" }}>
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default ExerciseChart;
