import GameBoard from "./components/organisms/GameBoard/GameBoard";
import { ThemeProvider } from "./components/organisms/GameBoard/ThemeProvider";
import MenuTheme from "./components/molecules/MenuTheme/MenuTheme";

const App = () => {
	return (
		<ThemeProvider>
			<MenuTheme />
			<GameBoard />
		</ThemeProvider>
	);
};
export default App;
