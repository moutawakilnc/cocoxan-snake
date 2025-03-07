import { createContext } from "react";
import { GameContextState, GameDifficulty } from "../types/common";
//DefaultValue inside
export const GameStateContext = createContext<GameContextState>({} as any);
