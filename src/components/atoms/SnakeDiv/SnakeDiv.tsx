import { Color } from "../../../utils/common/colors";

interface props {
	color: Color;
	size: number;
	x: number;
	y: number;
}

const SnakeDiv: React.FC<props> = ({ color, size }) => {
	return (
		<div style={{ backgroundColor: color, width: size, height: size }}></div>
	);
};

export default SnakeDiv;
