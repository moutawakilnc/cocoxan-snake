import { StackNavigationProp } from "@react-navigation/stack";
import { ReactNode } from "react";
import { TypeOfObjects } from "../constants/Game";

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

export type ObjPosition<T = number> = Position<T> & { ref?: any };
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

export type DirectionType = "up" | "down" | "right" | "left";

export interface IGameLogicContext {
	snake: Snake;
	setSnake: any;
	direction: DirectionType | null;
	setDirection: any;
	apples: TApple[];
	setApples: any;
	eatenApples: number;
	setEatenApples: any;
	collision: CollisionType;
	snakeAnimation: AnimationStatus;
	snakeAnimationControl: { [a: string]: EmptyParamVoidReturn };
}
export type GameStatus = "READY" | "PLAY" | "LOST";

export type AnimationStatus = "STOPPED" | "RUNNING" | "PAUSED";

export type EmptyParamVoidReturn = () => void;

export interface ProviderProps {
	children?: ReactNode;
}
export interface UseHooksUpdateState<T> {
	value: T | null;
	setValue: React.Dispatch<React.SetStateAction<T | null>>;
}

export type CollisionType = boolean;

export type Wall = NamedElementInSpace<Distance, []>;
