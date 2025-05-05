import {
	DIRECTION_MOVE,
	Distance,
	MapBorders,
	Position,
} from "../types/common";

export const GAME_BOARD_SIZE = 20;

export const MAP_BORDERS: MapBorders<Distance> = {
	x: { start: -25, end: 40 },
	y: { start: -20, end: 27 },
};

export enum TypeOfObjects {
	snake,
	apple,
	wall,
}
export const EAT_TOLERANCE: Partial<Position> = { x: 0.6, z: 0.2 };

export enum ElementsEnum {
	snake,
	wall,
	apple,
}

export const DIRECTION_MOVE_SPEED = 2;

export const SNAKE_SIZE = 2;
export const APPLE_SIZE = 2;

export enum MOUVEMENT_KEY {
	arrowUp,
	arrowDown,
	arrowLeft,
	arrowRight,
	none,
}

export const MOUVEMENT_DIRECTION: DIRECTION_MOVE = {
	arrowUp: { x: 0, y: -1 * DIRECTION_MOVE_SPEED, z: 0 },
	arrowDown: { x: 0, y: DIRECTION_MOVE_SPEED, z: 0 },
	arrowLeft: { x: -1 * DIRECTION_MOVE_SPEED, y: 0, z: 0 },
	arrowRight: {
		x: DIRECTION_MOVE_SPEED,
		y: 0,
		z: 0,
	},
	none: { x: 0, y: 0, z: 0 },
};

export enum DIRECTION_ZONE {
	TOP,
	LEFT,
	RIGHT,
	BOTTOM,
}
