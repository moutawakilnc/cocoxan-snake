import {
	APPLE_SIZE,
	MOUVEMENT_DIRECTION,
	MOUVEMENT_KEY,
	SNAKE_SIZE,
	TypeOfObjects,
} from "../constants/Game";
import { Distance, ObjPosition } from "../types/common";

export const castNumberObjectToDistance = (
	object: ObjPosition<number>,
	type: TypeOfObjects
) => {
	let objectToReturn: ObjPosition<Distance> = {
		x: { start: object.x, end: object.x },
		y: { start: object.y, end: object.y },
		ref: object.ref,
		name: object.name,
		parent: type,
	};
	let sizeToAdd = 0;
	switch (type) {
		case TypeOfObjects.apple:
			sizeToAdd = APPLE_SIZE;
			break;
		case TypeOfObjects.snake:
			sizeToAdd = SNAKE_SIZE;
			break;
		default:
			break;
	}
	objectToReturn.x.end += sizeToAdd;
	objectToReturn.y.end += sizeToAdd;
	return objectToReturn;
};

export const mapEventToDirection: (dir: string) => MOUVEMENT_KEY = (
	dir: string
) => {
	switch (dir) {
		case "ArrowUp":
			return MOUVEMENT_KEY.arrowUp;
		case "ArrowDown":
			return MOUVEMENT_KEY.arrowDown;
		case "ArrowLeft":
			return MOUVEMENT_KEY.arrowLeft;
		case "ArrowRight":
			return MOUVEMENT_KEY.arrowRight;
		default:
			return MOUVEMENT_KEY.none;
	}
};

export const mapMovKeyToPos = (dir: MOUVEMENT_KEY) => MOUVEMENT_DIRECTION[dir];
