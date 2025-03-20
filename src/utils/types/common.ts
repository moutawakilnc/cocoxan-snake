import { StackNavigationProp } from "@react-navigation/stack";
import { ReactNode } from "react";

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

export type Position<T = string> = T extends string
	? {
			x: number;
			y: number;
			z: number;
	  }
	: { x: T; y: T; z?: T };

export type ObjPosition = Position & { ref?: any };
//[]
export type ElementPositions = ObjPosition[];

export type ElementInSpace<T = unknown> = T extends []
	? ObjPosition[]
	: ObjPosition;
export type NamedElementInSpace = { name: string; element: ElementInSpace };
export interface IApple {
	apples: NamedElementInSpace[];
}

export interface Snake {
	name: String;
	positions: ElementInSpace<[]>;
}

export type TApple = NamedElementInSpace[];

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
export interface IGameLogicContext {
	snake: Snake;
	setSnake: any;
	apples: TApple;
	setApples: any;
	eatenApples: number;
	setEatenApples: any;
	outOfMap: any;
	setOutOfMap: any;
}
export type GameStatus = "READY" | "PLAY" | "LOST";

export interface ProviderProps {
	children?: ReactNode;
}
