import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./WorkoutTemplate.scss";

function WorkoutTemplate({ reloadtempaltes }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/templates")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setTemplates(data);
      })
      .catch((err) => console.error("Error fetching templates:", err));
  }, [reloadtempaltes]);

  //setTemplates([...templates, data]); // Update state

  return (
    <section className="templateSection">
      <h1 className="templateSection__title">Sample Templates</h1>
      <div className="templateCard">
        <ul className="templateCard__list">
          {templates.map((template) => (
            <li key={template.id} className="templateCard__item">
              <Link
                to={{
                  pathname: "/start",
                  state: { exercises: template.exercises },
                }}
                className="templateCard__link"
              >
                <div className="templateCard__section">
                  <div className="templateCard__title">
                    <h3 className="templateCard__name">
                      {template.template_name}
                    </h3>
                    {/* <p className="templateCard__date">{template.date}</p> */}
                  </div>
                  {/* <h4>Exercises: </h4> */}
                  <ul className="templateCard__exerciseList">
                    {Array.isArray(template.exercises)
                      ? template.exercises.map((exercise, index) => (
                          <li
                            key={index}
                            className="templateCard__exerciseItem"
                          >
                            {exercise}
                          </li>
                        ))
                      : template.exercises
                      ? JSON.parse(template.exercises).map(
                          (exercise, index) => <li key={index}>{exercise}</li>
                        )
                      : "No exercises listed"}
                  </ul>
                  <p> Notes: {template.notes}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default WorkoutTemplate;
