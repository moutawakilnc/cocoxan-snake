import { useState } from "react";
import { SnakeContext } from "../../../utils/Snake/hooks/context";
import { ISnakeProperties } from "../../../utils/Snake/types";
import { DEFAULT_PROPERTIES } from "../../../utils/Snake/constants";

interface props {
	children: React.ReactNode;
}
const SnakeProvider: React.FC<props> = ({ children }) => {
	const [properties, setProperties] =
		useState<ISnakeProperties>(DEFAULT_PROPERTIES);

	const changeProperty = (a: Partial<ISnakeProperties>) => {
		setProperties((prev) => ({ ...prev, ...a }));
	};
	return (
		<SnakeContext.Provider value={{ properties, changeProperty }}>
			{children}
		</SnakeContext.Provider>
	);
};

export default SnakeProvider;
