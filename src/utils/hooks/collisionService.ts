import { IUseColl } from "../types/componentProps";

export const checkCollision = ({ objectA, objectB }: IUseColl) =>
  objectA.x.start >= objectB.x.start &&
  objectA.x.start <= objectB.x.end &&
  objectA.y.start >= objectB.y.start &&
  objectA.y.start <= objectB.y.end;
