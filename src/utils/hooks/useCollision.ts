import { useEffect, useState } from "react";
import { IUseCollisionManagerProps } from "../types/componentProps";
import { CollisionType, Distance, ObjPosition, Wall } from "../types/common";
import { DIRECTION_ZONE, TypeOfObjects } from "../constants/Game";
import { checkCollision } from "./collisionService";
import { castNumberObjectToDistance } from "./helper";

const useCollisionManager = ({
  objectA,
  objectB,
  type,
}: IUseCollisionManagerProps) => {
  const [collisionUp, setValue] = useState<CollisionType<
    ObjPosition<Distance>
  > | null>(null);
  useEffect(() => {
    let head = castNumberObjectToDistance(
      objectA as ObjPosition<number>,
      TypeOfObjects.snake
    ) as ObjPosition<Distance>;
    if (type === TypeOfObjects.wall) {
      let wallFragmentCollided: ObjPosition<Distance> | undefined;
      const wallFragments = (objectB as Wall)
        .element as ObjPosition<Distance>[]; //for sure ;) , or not? :'(
      const isWallColided = wallFragments.some((wallFragment) => {
        wallFragmentCollided = wallFragment;
        return checkCollision({
          objectA: head,
          objectB: wallFragment,
        });
      });
      if (isWallColided) {
        setValue({
          collide: wallFragmentCollided!,
          positionOfCollision: wallFragmentCollided?.name!,
        });
      } else {
        setValue(null);
      }
    } else if (type === TypeOfObjects.apple) {
      return;
      if (Array.isArray(objectB)) {
        /*const apples = objectB as NamedElementInSpace[];

          const isAppleCollision = apples.some((apple) => {
            let appleObject: NamedElementInSpace<Distance> = {
              ...apple,
              element: castNumberObjectToDistance(
                apple.element,
                TypeOfObjects.apple
              ),
            };
            nameOfObject = apple.name;
            console.log("collision Apple");
            return checkCollision({
              objectA: firstObject,
              objectB: appleObject.element,
            });
          });
          if (isAppleCollision) {
            setValue({ collide: nameOfObject! });
          } else {
            setValue({ collide: false });
          }*/
      } else {
        console.error("Object apple, should be an array");
      }
    }
  }, []);

  return collisionUp;
};

export default useCollisionManager;
