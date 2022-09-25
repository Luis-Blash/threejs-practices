import React, { useEffect, useRef } from "react";
import { App } from "../threejs/App";

export const Threejs = () => {
  const gameContainer = useRef(null);
  const active = useRef(null);
  useEffect(() => {
    if (!active.current) {
      const app = new App(gameContainer.current);
      active.current = true;
      window.addEventListener("resize", () => {
        app.onResize();
      });
    }
  }, []);

  return <div ref={gameContainer} id="game-container"></div>;
};
