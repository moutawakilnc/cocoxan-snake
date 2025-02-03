import { useContext } from "react";
import { ArgFunction } from "../../../utils/common/types";

interface props {
	onClick: ArgFunction;
	value?: string;
}

const Button = ({ onClick, value }: props) => {
	return <input type="button" onClick={onClick} value={value} />;
};

export default Button;
