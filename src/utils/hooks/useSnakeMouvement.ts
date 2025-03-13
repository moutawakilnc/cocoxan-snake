import { useEffect } from "react";
import { Snake } from "../types/common";
import { UseSnakeProps } from "../types/componentProps";
import useCollision from "./useCollision";

const useSnakeMouvement = ({ snake, setSnake }: UseSnakeProps) => {
	const { isOutOfMap } = useCollision({
		snake: snake,
		setSnake: setSnake,
	});

	useEffect(() => {
		if (["x", "y"].includes(isOutOfMap.type ?? "")) {
			setSnake((prev: Snake) => ({
				...prev,
				positions: [
					{ ...prev.positions[0], [isOutOfMap.type!]: isOutOfMap.newHead },
					...prev.positions.slice(1),
				],
			}));
		}
	}, [isOutOfMap]);

	return { isOutOfMap };
};

export default useSnakeMouvement;
