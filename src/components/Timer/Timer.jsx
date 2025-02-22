import React from "react";
import { useState, useEffect } from "react";

import { FaPlay, FaPause, FaStop } from "react-icons/fa";

import "./Timer.scss";

function Timer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

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
    <div>
      <div className="timer">
        {formatTime(elapsedTime)}
        <div className="time__button-container">
          <button
            onClick={toggleTimer}
            className="timer__button timer__button-play"
          >
            {isRunning ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={resetTimer}
            className="timer__button timer__button-reset"
          >
            <FaStop />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
