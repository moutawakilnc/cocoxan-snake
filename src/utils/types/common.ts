import { StackNavigationProp } from "@react-navigation/stack";
import { ReactNode } from "react";
import {
  DIRECTION_ZONE,
  MOUVEMENT_DIRECTION,
  MOUVEMENT_KEY,
  TypeOfObjects,
} from "../constants/Game";
import { ObjectOfGame } from "./componentProps";

export type ButtonType = "native" | "flex";

export type NavigationType = {
  Home: undefined;
  Game: any;
  //Profile: { userId: number };  Si tu veux passer des paramètres
};

export type NavigationHome = StackNavigationProp<NavigationType, "Home">;
export type NavigationGame = StackNavigationProp<NavigationType, "Game">;

export type VectorTwoDimension<T> = { x: T; z: T };
export type Distance = { start: number; end: number };
export type MapBorders<T = string> = Position<T>;

export type Position<T = number> = {
  x: T;
  y: T;
  z?: T;
};

export type ObjPosition<T = number> = Position<T> & {
  id?: number;
  name?: Direction_Zone;
  ref?: any;
  parent: TypeOfObjects;
};
//[]

export type NamedElementInSpace<T = number, Y = undefined> = {
  name: string;
  type: TypeOfObjects;
  element: Y extends undefined ? ObjPosition<T> : ObjPosition<T>[];
};

export interface Snake extends NamedElementInSpace<number, []> {}

export interface TApple extends NamedElementInSpace {}

export enum GameDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export interface GameContextState {
  gameScore: number;
  setGameScore?: React.Dispatch<React.SetStateAction<number>>;
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  gameDifficulty: GameDifficulty;
  setGameDifficulty?: React.Dispatch<React.SetStateAction<GameDifficulty>>;
  appleEaten: number;
  setAppleEaten: React.Dispatch<React.SetStateAction<number>>;
}

export type DirectionType = {
  type: MOUVEMENT_KEY;
  coordinates: Position;
};

export interface IGameLogicContext {
  snake: Snake;
  setSnake: React.Dispatch<React.SetStateAction<Snake>>;
  direction: DirectionType;
  setDirection: React.Dispatch<React.SetStateAction<DirectionType>>;
  apples: TApple[];
  setApples: any;
  eatenApples: number;
  setEatenApples: any;
  collision: CollisionType<false | ObjPosition<Distance>> | null;
  gameAnimation: AnimationControl[keyof AnimationControl];
  gameAnimationControl: { [a in keyof AnimationControl]: EmptyParamVoidReturn };
}
export type GameStatus = "READY" | "PLAY" | "LOST";

export type AnimationControl = {
  stop: "STOPPED";
  start: "RUNNING";
  pause: "PAUSED";
};

export type EmptyParamVoidReturn = () => void;

export interface ProviderProps {
  children?: ReactNode;
}
export interface UseHooksUpdateState<T> {
  value: T | null;
  setValue: React.Dispatch<React.SetStateAction<T | null>>;
}

export type CollisionType<T> = {
  collide: T;
  positionOfCollision?: Direction_Zone;
};

export type Wall = NamedElementInSpace<Distance, []>;
export type WallfragmentZone = "TOP" | "LEFT" | "RIGHT" | "BOTTOM";
export type CollisionZone = "HEAD" | "ALL" | "QUEUE";

export type DIRECTION_MOVE = {
  [a in keyof typeof MOUVEMENT_KEY]: Position;
};

export type Direction_Zone = DIRECTION_ZONE;
