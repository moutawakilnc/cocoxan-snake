export type ArgFunction<T = void> = T extends void
	? () => void
	: (arg: T) => void;

export type Dimension = { width: number; height: number };
