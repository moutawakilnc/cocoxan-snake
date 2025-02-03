import React, { useRef, useEffect } from "react";
import { useThemeContext } from "../../../utils/GameBoard/hooks/context";
const GameBoard = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const {
		theme: { background, borderColor },
	} = useThemeContext();
	useEffect(() => {
		const canvas = canvasRef.current;

		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const width = canvas.offsetWidth!;
		const height = canvas.offsetHeight!;
		ctx.fillStyle = background;
		ctx.fillRect(0, 0, width, height);
	}, [background, borderColor]);

	return (
		<canvas
			ref={canvasRef}
			style={{ border: `2px solid ${borderColor}` }}
		></canvas>
	);
};

export default GameBoard;
