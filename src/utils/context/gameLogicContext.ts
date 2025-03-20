import { createContext } from "react";
import { IGameLogicContext } from "../types/common";
//DefaultValue inside
export const GameLogicContext = createContext<IGameLogicContext>({} as any);
