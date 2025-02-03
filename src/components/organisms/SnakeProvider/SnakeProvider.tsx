import { useState } from "react";
import { SnakeContext } from "../../../utils/Snake/hooks/context";
import { ISnakeProperties } from "../../../utils/Snake/types";
import { DEFAULT_PROPERTIES } from "../../../utils/Snake/constants";

interface props {
	children: any;
}
const SnakeProvider: React.FC<props> = ({ children }) => {
	const [properties, setProperties] =
		useState<ISnakeProperties>(DEFAULT_PROPERTIES);

	const changeProperty = (a: Partial<ISnakeProperties>) => {
		setProperties({ ...properties, ...a });
	};
	return (
		<SnakeContext.Provider value={{ properties: properties, changeProperty }}>
			{children}
		</SnakeContext.Provider>
	);
};

export default SnakeProvider;
