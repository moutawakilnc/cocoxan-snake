import { createContext, useContext } from "react";
import { IThemeContext } from "../types";

export const ThemeContext = createContext(
	{} as IThemeContext
) as unknown as React.Context<IThemeContext>;

export const useThemeContext = () => useContext(ThemeContext);
