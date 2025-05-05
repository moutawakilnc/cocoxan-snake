import { useEffect, useState } from "react";
import { IUseCollisionManagerProps } from "../types/componentProps";
import { CollisionType, Distance, ObjPosition } from "../types/common";
import { DIRECTION_ZONE, TypeOfObjects } from "../constants/Game";
import { checkCollision } from "./collisionService";
import { castNumberObjectToDistance } from "./helper";

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
			let head: any = objectA.element;
			head = castNumberObjectToDistance(
				head as ObjPosition<number>,
				TypeOfObjects.snake
			) as ObjPosition<Distance>;
			if (type === TypeOfObjects.wall) {
				let wallFragmentCollided: ObjPosition<Distance> | undefined;
				if (!Array.isArray(objectB)) {
					let nameOfObject: ObjPosition<Distance>;

					const wallFragments = objectB.element as ObjPosition<Distance>[]; //for sure ;) , or not? :'(
					const isWallColided = wallFragments.some((wallFragment) => {
						nameOfObject = wallFragment!;
						wallFragmentCollided = wallFragment;
						return checkCollision({
							objectA: head,
							objectB: wallFragment,
						});
					});
					setValue({
						collide: isWallColided ? wallFragmentCollided! : false,
						positionOfCollision: DIRECTION_ZONE.TOP,
					});
				} else {
					console.error("Wall shouldn't be an array!");
				}
			} else if (type === TypeOfObjects.apple) {
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
		}
	}, []);

	return collisionUp;
};

export default useCollisionManager;
