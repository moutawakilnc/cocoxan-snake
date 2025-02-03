import { useState } from "react";
import { INITIAL_SNAKE_SIZE } from "../../../utils/Snake/constants";
import { useSnakeContext } from "../../../utils/Snake/hooks/context";

const Snake = () => {
	const { properties: size } = useSnakeContext();
};

export default Snake;
