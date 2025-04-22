import { useEffect, useState } from "react";
import { IUseCollisionManagerProps } from "../types/componentProps";
import { CollisionType, Distance, ObjPosition } from "../types/common";
import { SNAKE_SIZE, TypeOfObjects } from "../constants/Game";
import { checkCollision } from "./collisionService";

const useCollisionManager = ({
  snakeHead,
  obstacle,
}: IUseCollisionManagerProps) => {
  const [collisionUp, setValue] = useState<
    CollisionType<typeof obstacle.element>
  >({
    collide: false,
  });
  useEffect(() => {
    let arrival: ObjPosition<Distance> | undefined = undefined;
    if (obstacle.type === TypeOfObjects.wall) {
      const wallFragments: ObjPosition<Distance>[] =
        obstacle.element as ObjPosition<Distance>[]; //for sure ;) , or not? :'(
      const isWallCollided = wallFragments.some((wallFragment) => {
        arrival = wallFragment;
        return checkCollision({
          objectA: {
            x: { start: snakeHead.x, end: snakeHead.x + SNAKE_SIZE },
            y: { start: snakeHead.y, end: snakeHead.y + SNAKE_SIZE },
          },
          objectB: wallFragment,
        });
      });
      if (isWallCollided) {
        setValue({ collide: arrival! });
      } else {
        setValue({ collide: false });
      }
    } else if (obstacle.type === TypeOfObjects.apple) {
      const apples: ObjPosition<number>[] =
        obstacle.element as ObjPosition<number>[];

      const isAppleEaten = apples.some(
        (apple) => snakeHead.x === apple.x && snakeHead.y === apple.y
      );
      if (isAppleEaten) {
      }
    }
  }, [obstacle]);

  return collisionUp;
};

export default useCollisionManager;
