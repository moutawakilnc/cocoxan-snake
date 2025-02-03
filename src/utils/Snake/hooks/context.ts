import { createContext, useContext } from "react";
import { ISnakeContext } from "../types";

export const SnakeContext = createContext(
	{} as ISnakeContext
) as unknown as React.Context<ISnakeContext>;

export const useSnakeContext = () => useContext(SnakeContext);
