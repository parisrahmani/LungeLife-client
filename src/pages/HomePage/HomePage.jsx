import { useState } from "react";
import { Link } from "react-router-dom";

import WorkoutTemplate from "../../components/WorkoutTemplate/WorkoutTemplate";
import Header from "../../components/Header/Header";
import NewTemplate from "../../components/NewTemplate/NewTemplate";

import "./HomePage.scss";

function Homepage() {
  const [addNewTemplate, setaddNewTemplate] = useState(false);
  const [templates, setTemplates] = useState([]);

  return (
    <div className="newSession">
      <Header />

      <Link to="/start">
        <button className="newSession__start-exercise-button">
          Start without Template
        </button>
      </Link>

      <div className="add-template">
        <button
          className="add-template__button"
          onClick={() => setaddNewTemplate(!addNewTemplate)}
        >
          + New Template
        </button>
        {addNewTemplate && <NewTemplate setTemplates={setTemplates} />}
      </div>

      <WorkoutTemplate setTemplates={setTemplates} templates={templates} />
    </div>
  );
}

export default Homepage;
