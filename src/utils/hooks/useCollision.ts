import { useEffect, useState } from "react";

import { IUseCollisionProps } from "../types/componentProps";
import { CollisionType, ObjPosition } from "../types/common";
import { TypeOfObjects } from "../constants/Game";

const useCollision = ({ snake, obstacle }: IUseCollisionProps) => {
	const [collisionUp, setValue] = useState<CollisionType>(false);
	useEffect(() => {
		if (obstacle.type === TypeOfObjects.wall) {
			const head: ObjPosition = snake.element[0];
			if (
				obstacle.element.some(
					(wallFragments) =>
						head.x >= wallFragments.x.start &&
						head.x <= wallFragments.x.end &&
						head.y >= wallFragments.y.start &&
						head.y <= wallFragments.y.end
				)
			) {
				setValue(true);
			}
		}
	}, [obstacle]);

	return collisionUp;
};

export default useCollision;
