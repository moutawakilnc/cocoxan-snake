import { Distance, MapBorders, Position } from "../types/common";

export const GAME_BOARD_SIZE = 20;

export const MAP_BORDERS: MapBorders<Distance> = {
	x: { start: -25, end: 40 },
	y: { start: -20, end: 27 },
};

export const EAT_TOLERANCE: Partial<Position> = { x: 0.6, z: 0.2 };

export enum ElementTypes {
	snake,
	map,
	apple,
}
