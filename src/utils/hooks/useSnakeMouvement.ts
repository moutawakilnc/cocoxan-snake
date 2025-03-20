import { useContext, useEffect } from "react";
import { Snake } from "../types/common";
import { GameLogicContext } from "../context/gameLogicContext";

const useSnakeMouvement = () => {
	const { snake, setSnake, outOfMap } = useContext(GameLogicContext);

	useEffect(() => {
		if (["x", "y"].includes(outOfMap.type ?? "")) {
			setSnake((prev: Snake) => ({
				...prev,
				positions: [
					{ ...prev.positions[0], [outOfMap.type!]: outOfMap.newHead },
					...prev.positions.slice(1),
				],
			}));
		}
	}, [outOfMap]);

	return { outOfMap, snake };
};

export default useSnakeMouvement;
