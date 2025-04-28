import { useCallback, useEffect, useState } from "react";
import {
  ProviderProps,
  Snake,
  TApple,
  DirectionType,
  Wall,
  AnimationControl,
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
    objectA: snake,
    objectB: apples,
    type: TypeOfObjects.apple,
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
  const collisionWall = useCollision({
    objectA: snake,
    objectB: wall,
    type: TypeOfObjects.wall,
  });
  useEffect(() => {
    if (!collisionWall) return;
  }, [collisionWall]);

  useEffect(() => {
    if (!collisionApple) return;
    setApples((prev) =>
      prev.filter((apple) => apple.name !== collisionApple.collide)
    );
    setEatenApples((prev) => prev++);
    console.log("apples:", apples);
  }, [collisionApple]);

  const [direction, setDirection] = useState<DirectionType | null>(null);
  const [gameAnimation, setGameAnimation] =
    useState<AnimationControl[keyof AnimationControl]>("STOPPED");

  const stop = useCallback(() => {
    setGameAnimation("STOPPED");
  }, []);
  const pause = useCallback(() => {
    setGameAnimation("PAUSED");
  }, []);
  const start = useCallback(() => {
    setGameAnimation("RUNNING");
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
        isWallCollided: collisionWall,
        gameAnimation: gameAnimation,
        gameAnimationControl: {
          start,
          pause,
          stop,
        },
      }}>
      {children}
    </GameLogicContext.Provider>
  );
};

export default GameLogicProvider;
