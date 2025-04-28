import { APPLE_SIZE, SNAKE_SIZE, TypeOfObjects } from "../constants/Game";
import { DirectionType, Distance, ObjPosition } from "../types/common";

export const castNumberObjectToDistance = (
  object: ObjPosition<number>,
  type: TypeOfObjects
) => {
  let objectToReturn: ObjPosition<Distance> | null = {
    x: { start: object.x, end: object.x },
    y: { start: object.y, end: object.y },
    ref: object.ref,
    name: object.name,
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

export const mapDirectionToMouvement = (direction: DirectionType["type"]) => {
  let directionCoords: DirectionType["coordinates"] | undefined;
  switch (direction) {
    case "ArrowRight":
      directionCoords = { x: 0, y: 1, z: 0 };
      break;
    case "ArrowDown":
      directionCoords = { x: 0, y: -1, z: 0 };
      break;
    case "ArrowLeft":
      directionCoords = { x: -1, y: 0, z: 0 };
      break;
    case "ArrowRight":
      directionCoords = { x: 1, y: 0, z: 0 };
      break;
    default:
      directionCoords = { x: 0, y: 0, z: 0 };
      break;
  }

  return { type: direction, coordinates: directionCoords } as DirectionType;
};
