import { useCallback, useEffect, useState } from "react";
import { GameStateContext } from "../context/gameStateContext";
import {
	GameDifficulty,
	ProviderProps,
	Snake,
	TApple,
	DirectionType,
	AnimationStatus,
	Wall,
} from "../types/common";
import { GameLogicContext } from "../context/gameLogicContext";
import useCollision from "../hooks/useCollision";

const GameLogicProvider: React.FC<ProviderProps> = ({ children }) => {
	const [snake, setSnake] = useState<Snake>({
		name: "player_snake",
		element: [
			{ x: 0, y: 0, z: 0 },
			{ x: -2, y: 0, z: 0 },
			{ x: -4, y: 0, z: 0 },
		],
	});
	const [apples, setApples] = useState<TApple[]>([
		{
			name: "apple",
			element: {
				x: { start: 3, end: 3 },
				y: { start: 0, end: 3 },
				z: { start: 0, end: 3 },
			},
		},
	]);
	const [eatenApples, setEatenApples] = useState(0);

	const collisionApple = useCollision({
		element: snake.element[0],
		obstacle: apples[0].element,
	});

	const collisionWall = useCollision({
		element: snake.element[0],
		obstacle: apples[0].element,
	});

	const [wall] = useState<Wall>({
		name: "wall",
		element: [{ x: { start: -25, end: 40 }, y: { start: -20, end: 27 } }],
	});
	useEffect(() => {
		if (!collisionWall) return;
		switch (collisionWall?.axis) {
			case null:
				break;
			default:
				setApples((prev) => prev.filter((apple) => apple.name !== "apple"));
				setEatenApples((prev) => prev++);
				break;
		}
	}, [collisionWall]);

	useEffect(() => {
		if (!collisionApple) return;
		switch (collisionApple?.axis) {
			case null:
				break;
			default:
				setApples((prev) => prev.filter((apple) => apple.name !== "apple"));
				setEatenApples((prev) => prev++);
				break;
		}
	}, [collisionApple]);

	const [direction, setDirection] = useState<DirectionType | null>(null);
	const [snakeAnimation, setSnakeAnimation] =
		useState<AnimationStatus>("STOPPED");

	const stopSnake = useCallback(() => {
		setSnakeAnimation("STOPPED");
	}, []);
	const pauseSnake = useCallback(() => {
		setSnakeAnimation("PAUSED");
	}, []);
	const startSnake = useCallback(() => {
		setSnakeAnimation("RUNNING");
	}, []);
	return (
		<GameLogicContext.Provider
			value={{
				apples,
				setApples,
				snake,
				setSnake,
				eatenApples,
				setEatenApples,
				direction: direction,
				setDirection,
				collision: collision,
				snakeAnimation: snakeAnimation,
				snakeAnimationControl: {
					startSnake,
					pauseSnake,
					stop,
				},
			}}
		>
			{children}
		</GameLogicContext.Provider>
	);
};

export default GameLogicProvider;
