import { APPLE_SIZE, SNAKE_SIZE, TypeOfObjects } from "../constants/Game";
import { Distance, ObjPosition } from "../types/common";

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
