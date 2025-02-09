import { useThemeContext } from "../../../utils/Theme/hooks/context";
import Button from "../../atoms/Button/Button";

const MenuTheme = () => {
	const { currentTheme, toggleValue } = useThemeContext();
	console.log("current theme", currentTheme);
	return (
		<div>
			<Button onClick={() => toggleValue()} value="Theme change" />
		</div>
	);
};
export default MenuTheme;
