import { Color } from "../common/colors";

export interface ISnakeProperties {
	color: Color;
	size: number;
	speed: number;
}
export interface ISnakeContext {
	properties: ISnakeProperties;
	changeProperty: (a: Partial<ISnakeProperties>) => void;
}
