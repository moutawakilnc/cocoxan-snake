import { useEffect, useState } from "react";

import { IUseCollisionProps } from "../types/componentProps";
import { CollisionType } from "../types/common";

const useCollision = ({ element, obstacle }: IUseCollisionProps) => {
	const [collisionUp, setValue] = useState<CollisionType | null>(null);
	useEffect(() => {
		if (element.x < obstacle.x.start || element.x > obstacle.x.end) {
			setValue({
				axis: "x",
			});
		} else if (element.y < obstacle.y.start || element.y > obstacle.y.end) {
			setValue({
				axis: "y",
			});
		} else {
			setValue(null);
		}
	}, [element, obstacle]);

	return collisionUp;
};

export default useCollision;
