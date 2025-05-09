import { useContext, useEffect } from "react";
import { Position, Snake } from "../types/common";
import { GameLogicContext } from "../context/gameLogicContext";

const useSnakeMouvement = () => {
	const { snake, setSnake, direction,collision } = useContext(GameLogicContext);
	console.log("1st", direction);
	const moveSnake = (radicalMove?: Partial<Position>) => {
		direction?.coordinates &&
			setSnake((prev: Snake) => {
				let newHeadPos = prev.element[0];
				newHeadPos = {
					...prev.element[0],
					x: radicalMove?.x ?? prev.element[0].x + direction!.coordinates.x,
					y: radicalMove?.y ?? prev.element[0].y + direction!.coordinates.y,
					z: 0,
				};

				return {
					...prev,
					element: [newHeadPos, ...prev.element.slice(0, -1)],
				};
			});
	};

	useEffect(() => {
		setTimeout(moveSnake, 130);
	}, [direction, snake?.element]);

	useEffect(() => {
		if (!snake?.element.length) return;
		if(collision)
		/*
		if (collision && collision.collide) {
			if (TypeOfObjects.wall == collision.collide.parent) {
				switch (collision.positionOfCollision) {
					case DIRECTION_ZONE.TOP:
						moveSnake({ y: MAP_BORDERS.y.start });
						break;
					case DIRECTION_ZONE.BOTTOM:
						moveSnake({ y: MAP_BORDERS.y.end });
						break;
					case DIRECTION_ZONE.LEFT:
						moveSnake({ x: MAP_BORDERS.x.end });
						break;
					case DIRECTION_ZONE.RIGHT:
						moveSnake({ x: MAP_BORDERS.x.start });
						break;
				}
			} else if (TypeOfObjects.apple == collision.collide.parent) {
			} else if (TypeOfObjects.snake == collision.collide.parent) {
			}
		}*/
	}, [direction, snake]);
};

export default useSnakeMouvement;
