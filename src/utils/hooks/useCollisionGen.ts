import { useContext, useEffect } from "react";
import { MAP_BORDERS } from "../constants/Game";
import { GameLogicContext } from "../context/gameLogicContext";
import { IUseCollision } from "../types/componentProps";

const useCollision = ({ toCompareWith }: IUseCollision) => {
	const { snake, outOfMap, setOutOfMap } = useContext(GameLogicContext);
	const head = snake.positions[0];

	useEffect(() => {
		if (head.x < MAP_BORDERS.x.start || head.x > MAP_BORDERS.x.end) {
			const newHead =
				head.x < MAP_BORDERS.x.start ? MAP_BORDERS.x.end : MAP_BORDERS.x.start;
			setOutOfMap({
				type: "x",
				newHead: newHead,
			});
		} else if (head.y < MAP_BORDERS.y.start || head.y > MAP_BORDERS.y.end) {
			const newHead =
				head.y < MAP_BORDERS.y.start ? MAP_BORDERS.y.end : MAP_BORDERS.y.start;
			setOutOfMap({
				type: "y",
				newHead: newHead,
			});
		} else {
			setOutOfMap({}); // If no collision, reset state
		}
	}, [snake.positions]);

	return { outOfMap };
};

export default useCollision;
