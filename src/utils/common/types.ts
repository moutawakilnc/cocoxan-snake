export type ArgFunction<T = void> = T extends void
	? () => void
	: (arg: T) => void;
