import { Euler } from "three";
import {
	ButtonType,
	CollisionType,
	Distance,
	ObjPosition,
	Position,
	Snake,
	UseHooksUpdateState,
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

export interface UseSnakeProps extends UseCollisionProps {}

export interface IUseCollisionProps {
	element: any;
	obstacle: any;
	collision: UseHooksUpdateState<Object>;
	collisionType: CollisionType;
}
