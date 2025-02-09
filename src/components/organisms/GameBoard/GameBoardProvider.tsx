import { useState } from "react";
import { Dimension } from "../../../utils/common/types";
import { CanvasLayer } from "../../../utils/GameBoard/types";
import { DEFAULT_DIMENSION } from "../../../utils/GameBoard/constants";
import { HashList } from "../../../utils/helpers/HashList";

const GameBoardProvider = () => {
	const [dimension, setDimension] = useState<Dimension>(DEFAULT_DIMENSION);
	const [layer, setLayer] = useState<HashList<CanvasLayer>>();
};

export default GameBoardProvider;
