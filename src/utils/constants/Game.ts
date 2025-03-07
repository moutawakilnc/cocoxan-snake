import { MapBorders, Position } from "../types/common";

export const GAME_BOARD_SIZE = 20;

export const MAP_BORDERS: MapBorders = {
  x: { start: -20, end: 20 },
  z: { start: -40, end: 10 },
};

export const EAT_TOLERANCE: Partial<Position> = { x: 0.6, z: 0.2 };
