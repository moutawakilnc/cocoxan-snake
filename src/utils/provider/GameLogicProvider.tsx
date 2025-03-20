import { useEffect, useState } from "react";
import { GameStateContext } from "../context/gameStateContext";
import {
	GameDifficulty,
	ProviderProps,
	GameStatus,
	Snake,
	TApple,
} from "../types/common";
import { GameLogicContext } from "../context/gameLogicContext";
import { CollisionState } from "../types/componentProps";

const GameLogicProvider: React.FC<ProviderProps> = ({ children }) => {
	const [snake, setSnake] = useState<Snake>({
		name: "player",
		positions: [
			{ x: 0, y: 0, z: 0 },
			{ x: -2, y: 0, z: 0 },
			{ x: -4, y: 0, z: 0 },
		],
	});
	const [apples, setApples] = useState<TApple>([
		{ name: "apple_1", element: { x: 3, y: 0, z: 0 } },
	]);
	const [eatenApples, setEatenApples] = useState(0);
	const [outOfMap, setOutOfMap] = useState<CollisionState>();
	return (
		<GameLogicContext.Provider
			value={{
				apples,
				setApples,
				snake,
				setSnake,
				eatenApples,
				setEatenApples,
				outOfMap,
				setOutOfMap,
			}}
		>
			{children}
		</GameLogicContext.Provider>
	);
};

export default GameLogicProvider;
