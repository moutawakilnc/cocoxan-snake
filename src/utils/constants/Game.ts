import { Distance, MapBorders, Position } from "../types/common";

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

export const DIRECTION_MOVE = {
  x: 2,
  y: 2,
  z: 2,
};

export const SNAKE_SIZE = 2;
export const APPLE_SIZE = 2;

export enum MOUVEMENT_KEY {
  up = "ArrowUp",
  down = "ArrowDown",
  left = "ArrowLeft",
  right = "ArrowRight",
}
