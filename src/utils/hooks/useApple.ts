import { useContext, useEffect } from "react";
import { Snake, UseHooksUpdateState } from "../types/common";
import { GameLogicContext } from "../context/gameLogicContext";

const useApple = ({ value, setValue }: UseHooksUpdateState<Snake>) => {
  const { snake, apples, setApples } = useContext(GameLogicContext);
  const snakeHead = snake.element[0];
};

export default useApple;
