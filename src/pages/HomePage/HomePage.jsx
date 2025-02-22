import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ExerciseModal from "../../components/ExerciseModal/ExerciseModal";
import WorkoutTemplate from "../../components/WorkoutTemplate/WorkoutTemplate";
import Header from "../../components/Header/Header";
import NewTemplate from "../../components/NewTemplate/NewTemplate";

import { useNavigate } from "react-router-dom";
import "./HomePage.scss";

function Homepage() {
  const navigate = useNavigate();

  const [reloadTemplates, setReloadTemplates] = useState(false);
  const [addNewTemplate, setaddNewTemplate] = useState(false);
  const [templates, setTemplates] = useState([]);

  return (
    <div className="newSession">
      <Header />

      <Link to="/start">
        <button className="newSession__start-exercise-button">
          {" "}
          Start a new workout
        </button>
      </Link>

      <div className="add-template">
        <button
          className="add-template__button"
          onClick={() => setaddNewTemplate(!addNewTemplate)}
        >
          Toggle Panel
        </button>
        {addNewTemplate && <NewTemplate setTemplates={setTemplates} />}
      </div>

      <WorkoutTemplate setTemplates={setTemplates} templates={templates} />
    </div>
  );
}

export default Homepage;
