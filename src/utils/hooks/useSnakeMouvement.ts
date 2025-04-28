import { useContext, useEffect, useRef } from "react";
import { DirectionType, Snake } from "../types/common";
import { GameLogicContext } from "../context/gameLogicContext";
import {
  DIRECTION_MOVE,
  MOUVEMENT_KEY,
  TypeOfObjects,
} from "../constants/Game";

const useSnakeMouvement = () => {
  const { snake, setSnake, direction, collision } =
    useContext(GameLogicContext);

  const moveSnake = () => {
    setSnake((prev: Snake) => {
      let newHeadPos = snake.element[0];
      switch (direction?.type) {
        case MOUVEMENT_KEY.up:
          newHeadPos = {
            ...snake.element[0],
            x: snake.element[0].x,
            y: snake.element[0].y + DIRECTION_MOVE.y,
            z: 0,
          };
          break;
        case MOUVEMENT_KEY.down:
          newHeadPos = {
            ...snake.element[0],
            x: snake.element[0].x,
            y: snake.element[0].y - DIRECTION_MOVE.y,
            z: 0,
          };
          break;
        case MOUVEMENT_KEY.left:
          newHeadPos = {
            ...snake.element[0],
            x: snake.element[0].x - DIRECTION_MOVE.x,
            y: snake.element[0].y,
            z: 0,
          };
          break;
        case MOUVEMENT_KEY.right:
          newHeadPos = {
            ...snake.element[0],
            x: snake.element[0].x + DIRECTION_MOVE.x,
            y: snake.element[0].y,
            z: 0,
          };
          break;
      }

      return {
        ...prev,
        element: [newHeadPos, ...prev.element.slice(0, -1)],
      };
    });
  };

  useEffect(() => {
    if (!snake.element.length) return;

    setTimeout(moveSnake, 130);
  }, [direction, snake.element]);

  useEffect(() => {
    if (!snake.element.length) return;

    if (!!collision) {
      switch (collision.parent) {
        case TypeOfObjects.wall:
          break;
        case TypeOfObjects.apple:
          break;
        case TypeOfObjects.snake:
          break;
        default:
          break;
      }
    }
  }, [direction, snake.element]);
};

export default useSnakeMouvement;
