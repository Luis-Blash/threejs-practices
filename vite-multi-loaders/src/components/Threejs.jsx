import React, { useEffect, useRef } from "react";
import { App } from "../threejs/App";

export const Threejs = () => {
  const gameContainer = useRef(null);
  const progressContainer = useRef(null);
  const progressBar = useRef(null);
  const active = useRef(null);
  useEffect(() => {
    if (!active.current) {
      const app = new App(gameContainer.current, {
        container: progressContainer.current,
        progress: progressBar.current,
      });
      active.current = true;
      window.addEventListener("resize", () => {
        app.onResize();
      });
    }
  }, []);

  return (
    <>
      <div ref={gameContainer} id="game-container">
        <div ref={progressContainer} className="progress-bar-container">
          <label htmlFor="progress-bar">Loading...</label>
          <progress
            ref={progressBar}
            id="progress-bar"
            value="0"
            max="100"
          ></progress>
        </div>
      </div>
    </>
  );
};
