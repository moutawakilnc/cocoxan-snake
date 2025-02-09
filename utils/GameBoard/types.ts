import { Dimension } from "../common/types";

export type FrameType = "basic";

export type CanvasLayer = "background" | "obstacle" | "snake" | "effects";
export interface IGameBoardContext {
	init: (dimension: Dimension, frameType?: FrameType) => void;
	setLayer: (layer: CanvasLayer) => void;
	startRenderLoop: (callback: () => void, fps?: number) => void;
	stopRenderLoop: () => void;
	onKeyPress: (callback: (event: KeyboardEvent) => void) => void;
	onMouseClick: (callback: (event: MouseEvent) => void) => void;
	saveSnapshot: () => ImageData;
	loadSnapshot: (snapshot: ImageData) => void;
	enableWebGL: (enable: boolean) => void; // <-- Active WebGL pour effets avancés
	resize: (dimension: Dimension) => void; //resize
}
