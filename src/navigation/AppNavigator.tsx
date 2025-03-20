import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// Import des écrans
import HomeScreen from "../screens/HomeScreen";
import SnakeGame from "../screens/GameScreen";
import Header from "../components/Header/Header";
import { NavigationType } from "../utils/types/common";
import { GameStateContext } from "../utils/context/gameStateContext";
import GameProvider from "../utils/provider/GameProvider";
import GameLogicProvider from "../utils/provider/GameLogicProvider";

const Stack = createStackNavigator<NavigationType>();

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={({ route }) => route.name !== "Home" && {}}
			>
				<Stack.Screen
					name="Home"
					component={() => (
						<GameLogicProvider>
							<SnakeGame />
						</GameLogicProvider>
					)}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Game"
					component={() => (
						<GameLogicProvider>
							<SnakeGame />
						</GameLogicProvider>
					)}
					options={{
						header: () => (
							<React.Fragment>
								{" "}
								<Header />{" "}
							</React.Fragment>
						),
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
