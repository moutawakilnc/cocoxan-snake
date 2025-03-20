import { useContext, useEffect } from "react";
import { Snake } from "../types/common";
import { UseHooksUpdateState, UseSnakeProps } from "../types/componentProps";
import useCollision from "./useCollision";
import useSnakeMouvement from "./useSnakeMouvement";
import { GameLogicContext } from "../context/gameLogicContext";

const useApple = ({ value, setValue }: UseHooksUpdateState<Snake>) => {
	const { snake, apples, setApples } = useContext(GameLogicContext);
	const snakeHead = snake.positions[0];
	useEffect(() => {
		if (snakeHead) {
		}
	}, [snakeHead]);
};

export default useApple;
