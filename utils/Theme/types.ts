import { themePicker } from "./constants";

export type ThemeName = keyof typeof themePicker;

export interface IThemeContext {
	currentTheme: ThemeName;
	step: number;
	theme: (typeof themePicker)[ThemeName];
	toggleValue: (themeName?: ThemeName) => void;
}
