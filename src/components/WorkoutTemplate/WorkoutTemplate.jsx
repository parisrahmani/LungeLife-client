import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./WorkoutTemplate.scss";

function WorkoutTemplate({ templates, reloadTempaltes, setTemplates }) {
  useEffect(() => {
    async function getTemplates() {
      try {
        const response = await fetch("http://localhost:8080/api/templates");
        const data = await response.json();
        console.log("Fetched data:", data);
        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTemplates(sortedData);
      } catch (err) {
        console.error("Error fetching templates:", err);
      }
    }

    getTemplates();
  }, [reloadTempaltes]);

  return (
    <section className="templateSection">
      <h1 className="templateSection__title">Sample Templates</h1>
      <div className="templateCard">
        <ul className="templateCard__list">
          {templates &&
            templates.map((template) => (
              <li key={template.id} className="templateCard__item">
                <Link
                  to={`/start/${template.id}`}
                  className="templateCard__link"
                >
                  <div className="templateCard__section">
                    <div className="templateCard__title">
                      <h3 className="templateCard__name">
                        {template.template_name}
                      </h3>
                      <p className="templateCard__note">
                        {" "}
                        Notes: {template.notes}
                      </p>
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
