const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development", // ou 'production' si tu veux compiler pour production
	entry: "./src/index.tsx", // fichier d'entrée
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js", // Nom du fichier de sortie
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"], // Extensions de fichiers à traiter
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/, // Charge les fichiers TS et TSX
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.js$/, // Charge les fichiers JS avec Babel
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"], // Configuration Babel pour React
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/, // Charge les fichiers CSS
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.scss$/, // Charge les fichiers Sass/SCSS
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	devServer: {
		static: { directory: path.resolve(__dirname, "dist") },
		port: 3000, // Port de développement
		hot: true,
	},
	plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
