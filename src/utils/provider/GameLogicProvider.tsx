import { useCallback, useEffect, useState } from "react";
import { GameStateContext } from "../context/gameStateContext";
import {
  GameDifficulty,
  ProviderProps,
  Snake,
  TApple,
  DirectionType,
  AnimationStatus,
  Wall,
} from "../types/common";
import { GameLogicContext } from "../context/gameLogicContext";
import useCollision from "../hooks/useCollision";
import { MAP_BORDERS, TypeOfObjects } from "../constants/Game";

const GameLogicProvider: React.FC<ProviderProps> = ({ children }) => {
  const [snake, setSnake] = useState<Snake>({
    name: "player_snake",
    type: TypeOfObjects.snake,
    element: [
      { x: 0, y: 0, z: 0 },
      { x: -2, y: 0, z: 0 },
      { x: -4, y: 0, z: 0 },
    ],
  });
  const [apples, setApples] = useState<TApple[]>([
    {
      name: "apple",
      type: TypeOfObjects.apple,
      element: {
        x: 3,
        y: 3,
        z: 0,
      },
    },
  ]);
  const [eatenApples, setEatenApples] = useState(0);

  const collisionApple = useCollision({
    snake: snake,
    obstacle: apples,
  });

  const collisionWall = useCollision({
    element: snake.element[0],
    obstacle: apples[0].element,
  });

  const [wall] = useState<Wall>({
    name: "wall",
    type: TypeOfObjects.wall,
    element: [
      {
        x: { start: MAP_BORDERS.x.start, end: MAP_BORDERS.x.end },
        y: { start: MAP_BORDERS.y.start, end: MAP_BORDERS.y.start + 1 },
      },
      {
        x: { start: MAP_BORDERS.x.start, end: MAP_BORDERS.x.start + 1 },
        y: { start: MAP_BORDERS.y.start, end: MAP_BORDERS.y.end },
      },
      {
        x: { start: MAP_BORDERS.x.start, end: MAP_BORDERS.x.end },
        y: { start: MAP_BORDERS.y.end - 1, end: MAP_BORDERS.y.end },
      },
      {
        x: { start: MAP_BORDERS.x.end - 1, end: MAP_BORDERS.x.end },
        y: { start: MAP_BORDERS.y.start, end: MAP_BORDERS.y.end },
      },
    ],
  });
  useEffect(() => {
    if (!collisionWall) return;
    switch (collisionWall?.axis) {
      case null:
        break;
      default:
        setApples((prev) => prev.filter((apple) => apple.name !== "apple"));
        setEatenApples((prev) => prev++);
        break;
    }
  }, [collisionWall]);

  useEffect(() => {
    if (!collisionApple) return;
    switch (collisionApple?.axis) {
      case null:
        break;
      default:
        setApples((prev) => prev.filter((apple) => apple.name !== "apple"));
        setEatenApples((prev) => prev++);
        break;
    }
  }, [collisionApple]);

  const [direction, setDirection] = useState<DirectionType | null>(null);
  const [snakeAnimation, setSnakeAnimation] =
    useState<AnimationStatus>("STOPPED");

  const stopSnake = useCallback(() => {
    setSnakeAnimation("STOPPED");
  }, []);
  const pauseSnake = useCallback(() => {
    setSnakeAnimation("PAUSED");
  }, []);
  const startSnake = useCallback(() => {
    setSnakeAnimation("RUNNING");
  }, []);
  return (
    <GameLogicContext.Provider
      value={{
        apples,
        setApples,
        snake,
        setSnake,
        eatenApples,
        setEatenApples,
        direction: direction,
        setDirection,
        collision: collision,
        snakeAnimation: snakeAnimation,
        snakeAnimationControl: {
          startSnake,
          pauseSnake,
          stop,
        },
      }}>
      {children}
    </GameLogicContext.Provider>
  );
};

export default GameLogicProvider;
