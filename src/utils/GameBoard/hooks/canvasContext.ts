import { createContext, useContext } from "react";
import { IGameBoardContext } from "../types";

export const GameBoardContext = createContext<IGameBoardContext>(
	{} as IGameBoardContext
) as unknown as React.Context<IGameBoardContext>;

export const useGameBordContext = () => useContext(GameBoardContext);
