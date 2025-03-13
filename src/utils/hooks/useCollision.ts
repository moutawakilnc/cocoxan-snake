import { useEffect, useState } from "react";
import { MAP_BORDERS } from "../constants/Game";
import { UseCollisionProps } from "../types/componentProps";

export interface CollisionState {
	type?: "x" | "y";
	newHead?: any;
}

const useCollision = ({ snake, setSnake }: UseCollisionProps) => {
	const head = snake.positions[0];

	const [isOutOfMap, setIsOutOfMap] = useState<CollisionState>({});

	useEffect(() => {
		if (head.x < MAP_BORDERS.x.start || head.x > MAP_BORDERS.x.end) {
			const newHead =
				head.x < MAP_BORDERS.x.start ? MAP_BORDERS.x.end : MAP_BORDERS.x.start;
			setIsOutOfMap({
				type: "x",
				newHead: newHead,
			});
		} else if (head.y < MAP_BORDERS.y.start || head.y > MAP_BORDERS.y.end) {
			const newHead =
				head.y < MAP_BORDERS.y.start ? MAP_BORDERS.y.end : MAP_BORDERS.y.start;
			setIsOutOfMap({
				type: "y",
				newHead: newHead,
			});
		} else {
			setIsOutOfMap({}); // If no collision, reset state
		}
	}, [snake.positions]);

	return { isOutOfMap };
};

export default useCollision;
