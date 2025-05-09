import { useEffect, useState } from "react";
import {
	IUseCollisionManagerProps,
	ObjectOfGame,
} from "../types/componentProps";
import { CollisionType, Distance, ObjPosition } from "../types/common";
import { TypeOfObjects } from "../constants/Game";
import { checkCollision } from "./collisionService";
import { castNumberObjectToDistance, getWallPosition } from "./helper";

const useCollisionManager = ({
	objectA,
	objectB,
	type,
}: IUseCollisionManagerProps) => {
	const [collisionUp, setValue] = useState<
		CollisionType<false | ObjPosition<Distance>>
	>({
		collide: false,
	});
	useEffect(() => {
		if (!Array.isArray(objectA)) {
			let head: ObjPosition<Distance> = castNumberObjectToDistance(
				objectA.element as ObjPosition<number>,
				TypeOfObjects.snake
			);
			if (type === TypeOfObjects.wall) {
				let wallFragmentCollided: ObjPosition<Distance> | undefined;

				const wallFragments = (objectB as ObjectOfGame)
					.element as ObjPosition<Distance>[]; //for sure ;) , or not? :'(
				const isWallColided = wallFragments.some((wallFragment) => {
					wallFragmentCollided = wallFragment;
					return checkCollision({
						objectA: head,
						objectB: wallFragment,
					});
				});
				if (isWallColided)
					setValue({
						collide: wallFragmentCollided!,
						positionOfCollision: getWallPosition(wallFragmentCollided!),
					});
				else
					setValue({
						collide: false,
					});
			}
		} else if (type === TypeOfObjects.apple) {
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
		}
	}, []);

	return collisionUp;
};

export default useCollisionManager;
