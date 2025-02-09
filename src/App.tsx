import { ThemeProvider } from "./components/organisms/ThemeProvider/ThemeProvider";
import MenuTheme from "./components/molecules/MenuTheme/MenuTheme";
import { HashList } from "./utils/helpers/HashList";

const App = () => {
	const a = new HashList({ e: "o" });
	console.log(a);
	return (
		<ThemeProvider>
			<MenuTheme />
		</ThemeProvider>
	);
};
export default App;
