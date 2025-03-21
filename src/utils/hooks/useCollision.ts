import { useEffect, useState } from "react";

import { IUseCollisionProps } from "../types/componentProps";
import { CollisionState } from "../types/common";

const useCollision = ({
	element,
	obstacle,
	collisionType,
}: IUseCollisionProps) => {
	const [collision, setCollision] = useState<CollisionState<
		typeof element,
		typeof obstacle
	> | null>(null);

	useEffect(() => {
		if (element.x < obstacle.x.start || element.x > obstacle.x.end) {
			/*const newHead =
				element.x < obstacle.x.start ? obstacle.x.end : obstacle.x.start;*/
			setCollision({
				firstElement: element,
				secondElement: obstacle,
				type: collisionType,
				axis: "x",
			});
		} else if (element.y < obstacle.z.start || element.z > obstacle.z.end) {
			setCollision({
				firstElement: element,
				secondElement: obstacle,
				type: collisionType,
				axis: "y",
			});
		} else {
			setCollision(null); // If no collision, reset state
		}
	}, [element, obstacle]);

	return { collision };
};

export default useCollision;
