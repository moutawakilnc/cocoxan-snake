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
import {
  DIRECTION_ZONE,
  MAP_BORDERS,
  MOUVEMENT_KEY,
  TypeOfObjects,
} from "../constants/Game";
import { mapMovKeyToPos } from "../hooks/helper";
import useSnakeMouvement from "../hooks/useSnakeMouvement";

const GameLogicProvider: React.FC<ProviderProps> = ({ children }) => {
  const [coll, setColl] = useState<TypeOfObjects>();
  const [snake, setSnake] = useState<Snake>({
    name: "player_snake",
    type: TypeOfObjects.snake,
    element: [
      { x: 0, y: 0, z: 0, parent: TypeOfObjects.snake },
      { x: -2, y: 0, z: 0, parent: TypeOfObjects.snake },
      { x: -4, y: 0, z: 0, parent: TypeOfObjects.snake },
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
        parent: TypeOfObjects.apple,
      },
    },
  ]);
  const [eatenApples, setEatenApples] = useState(0);
  const snakeHead = snake.element[0];
  const collisionApple = useCollision({
    objectA: snakeHead,
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
        parent: TypeOfObjects.wall,
        name: DIRECTION_ZONE.TOP,
      },
      {
        x: { start: MAP_BORDERS.x.start, end: MAP_BORDERS.x.start + 1 },
        y: { start: MAP_BORDERS.y.start, end: MAP_BORDERS.y.end },
        name: DIRECTION_ZONE.LEFT,
        parent: TypeOfObjects.wall,
      },
      {
        x: { start: MAP_BORDERS.x.start, end: MAP_BORDERS.x.end },
        y: { start: MAP_BORDERS.y.end - 1, end: MAP_BORDERS.y.end },
        name: DIRECTION_ZONE.BOTTOM,
        parent: TypeOfObjects.wall,
      },
      {
        x: { start: MAP_BORDERS.x.end - 1, end: MAP_BORDERS.x.end },
        y: { start: MAP_BORDERS.y.start, end: MAP_BORDERS.y.end },
        name: DIRECTION_ZONE.RIGHT,
        parent: TypeOfObjects.wall,
      },
    ],
  });
  const collisionWall = useCollision({
    objectA: snakeHead,
    objectB: wall,
    type: TypeOfObjects.wall,
  });
  useSnakeMouvement();

  useEffect(() => {
    if (!collisionApple) return;
    setColl(TypeOfObjects.apple);
  }, [collisionApple]);
  const [direction, setDirection] = useState<DirectionType>({
    type: MOUVEMENT_KEY.none,
    coordinates: mapMovKeyToPos(MOUVEMENT_KEY.none),
  });
  const [gameAnimation, setGameAnimation] =
    useState<AnimationControl[keyof AnimationControl]>("RUNNING");

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
        direction,
        setDirection,
        collision: collisionWall,
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
