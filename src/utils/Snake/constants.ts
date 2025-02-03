import { Color } from "../common/colors";
import { ISnakeProperties } from "./types";

export const INITIAL_SNAKE_SIZE = 1;
export const DEFAULT_SIZE = 20;
export const DEFAULT_SPEED = 1;
export const DEFAULT_COLOR: Color = "green";

export const DEFAULT_PROPERTIES: ISnakeProperties = {
	color: DEFAULT_COLOR,
	size: DEFAULT_SIZE,
	speed: DEFAULT_SPEED,
};
