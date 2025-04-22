import { useContext, useEffect } from "react";
import { Snake } from "../types/common";
import { GameLogicContext } from "../context/gameLogicContext";
import { DIRECTION_MOVE } from "../constants/Game";

const useSnakeMouvement = () => {
  const { snake, setSnake, direction } = useContext(GameLogicContext);
  useEffect(() => {
    if (!snake.element.length) return;
    setSnake((prev: Snake) => {
      let newHeadPos = snake.element[0];
      switch (direction) {
        case "up":
          newHeadPos = {
            x: snake.element[0].x,
            y: snake.element[0].y + DIRECTION_MOVE.y,
            z: 0,
          };
          break;
        case "down":
          newHeadPos = {
            x: snake.element[0].x,
            y: snake.element[0].y - DIRECTION_MOVE.y,
            z: 0,
          };
          break;
        case "left":
          newHeadPos = {
            x: snake.element[0].x - DIRECTION_MOVE.x,
            y: snake.element[0].y,
            z: 0,
          };
          break;
        case "right":
          newHeadPos = {
            x: snake.element[0].x + DIRECTION_MOVE.x,
            y: snake.element[0].y,
            z: 0,
          };
          break;
      }
      return {
        ...prev,
        positions: [newHeadPos, ...prev.element.slice(0, -1)],
      };
    });
  }, [direction, snake.element]);
};

export default useSnakeMouvement;
