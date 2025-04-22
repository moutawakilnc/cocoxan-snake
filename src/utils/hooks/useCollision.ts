import { useEffect, useState } from "react";
import { IUseCollisionManagerProps } from "../types/componentProps";
import {
  CollisionType,
  Distance,
  NamedElementInSpace,
  ObjPosition,
  TApple,
  Wall,
} from "../types/common";
import { TypeOfObjects } from "../constants/Game";
import { checkCollision } from "./collisionService";
import { castNumberObjectToDistance } from "./helper";

const useCollisionManager = ({
  objectA,
  objectB,
  type,
}: IUseCollisionManagerProps) => {
  const [collisionUp, setValue] = useState<CollisionType<boolean | string>>({
    collide: false,
  });
  useEffect(() => {
    if (!Array.isArray(objectA)) {
      let nameOfObject: string | undefined;
      let firstObject = castNumberObjectToDistance(
        objectA.element as ObjPosition<number>,
        objectA.type
      );

      if (type === TypeOfObjects.wall) {
        if (!Array.isArray(objectB)) {
          const wallFragments = objectB.element as ObjPosition<Distance>[]; //for sure ;) , or not? :'(
          const isWallCollision = wallFragments.some((wallFragment) => {
            nameOfObject = wallFragment.name;
            return checkCollision({
              objectA: firstObject,
              objectB: wallFragment,
            });
          });
          if (isWallCollision) {
            setValue({
              collide: nameOfObject!,
            });
          } else {
            setValue({ collide: false });
          }
        } else {
          console.error("Object wall shouldn't be an array!");
        }
      } else if (type === TypeOfObjects.apple) {
        if (Array.isArray(objectB)) {
          const apples = objectB as NamedElementInSpace[];

          const isAppleCollision = apples.some((apple) => {
            let appleObject: NamedElementInSpace<Distance> = {
              ...apple,
              element: castNumberObjectToDistance(
                apple.element,
                TypeOfObjects.apple
              ),
            };
            nameOfObject = apple.name;
            return checkCollision({
              objectA: firstObject,
              objectB: appleObject.element,
            });
          });
          if (isAppleCollision) {
            setValue({ collide: nameOfObject! });
          } else {
            setValue({ collide: false });
          }
        } else {
          console.error("Object apple, should be an array");
        }
      }
    }
  }, []);

  return collisionUp;
};

export default useCollisionManager;
