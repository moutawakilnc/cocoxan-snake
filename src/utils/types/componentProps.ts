import { Euler } from "three";
import {
	ButtonType,
	Distance,
	Position,
	Snake,
	VectorTwoDimension,
} from "./common";
import { SetStateAction } from "react";

export interface IButtonProps {
	title?: string;
	type?: ButtonType;
	imageSrc?: string;
	isImage?: boolean;
	buttonStyle?: any;
	textStyle?: any;
	press?: any;
}

export interface IHeaderProps {}

export interface AppleProp {
	position: any;
	scene?: any;
}

export interface SnakeFragmentProps {
	position: any;
	rotation?: any;
	scale?: number;
	ref?: any;
}

export interface UseCollisionProps {
	snake: Snake;
	setSnake: any;
}
export interface UseHooksUpdateState<T> {
	value: T;
	setValue: React.Dispatch<React.SetStateAction<T>>;
}
export interface UseSnakeProps extends UseCollisionProps {}
export interface CollisionState {
	type?: "x" | "y";
	newHead?: any;
}

export interface IUseCollision {
	toCompareWith: VectorTwoDimension<Distance>;
}
