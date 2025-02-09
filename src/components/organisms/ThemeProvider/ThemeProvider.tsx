import { useState } from "react";

import { ThemeContext } from "../../../utils/Theme/hooks/context";
import { ThemeName } from "../../../utils/Theme/types";
import { themePicker } from "../../../utils/Theme/constants";

export const ThemeProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [currentThemeName, setCurrentThemeName] = useState<ThemeName>("clear");
	const [step, setStep] = useState<number>(1);
	const toggleTheme = (e?: ThemeName) => {
		if (!e) {
			var key = Object.keys(themePicker) as ThemeName[];
			var indexOfCurrent = key.indexOf(currentThemeName);
			setCurrentThemeName(
				key[(indexOfCurrent + (step < 0 ? key.length : step)) % key.length]
			);
		} else {
			setCurrentThemeName(e);
		}
	};
	return (
		<ThemeContext.Provider
			value={{
				step: step,
				currentTheme: currentThemeName,
				theme: themePicker[currentThemeName],
				toggleValue: toggleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
