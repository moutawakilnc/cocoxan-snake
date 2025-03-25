import { useContext, useEffect } from "react";
import { Snake } from "../types/common";
import { GameLogicContext } from "../context/gameLogicContext";
import { DIRECTION_MOVE } from "../constants/Game";

const useSnakeMouvement = () => {
	const { snake, setSnake, direction } = useContext(GameLogicContext);
	useEffect(() => {
		if (!snake.positions.length) return;
		setSnake((prev: Snake) => {
			let newHeadPos = snake.positions[0];
			switch (direction) {
				case "up":
					newHeadPos = {
						x: snake.positions[0].x,
						y: snake.positions[0].y + DIRECTION_MOVE.y,
						z: 0,
					};
					break;
				case "down":
					newHeadPos = {
						x: snake.positions[0].x,
						y: snake.positions[0].y - DIRECTION_MOVE.y,
						z: 0,
					};
					break;
				case "left":
					newHeadPos = {
						x: snake.positions[0].x - DIRECTION_MOVE.x,
						y: snake.positions[0].y,
						z: 0,
					};
					break;
				case "right":
					newHeadPos = {
						x: snake.positions[0].x + DIRECTION_MOVE.x,
						y: snake.positions[0].y,
						z: 0,
					};
					break;
			}
			return {
				...prev,
				positions: [newHeadPos, ...prev.positions.slice(0, -1)],
			};
		});
	}, [direction, snake.positions]);
};

export default useSnakeMouvement;
