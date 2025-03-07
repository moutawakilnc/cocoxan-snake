import { useContext } from "react";
import { TextComponent, View } from "react-native";
import { GameStateContext } from "../../utils/context/gameStateContext";

const Score = () => {
  const { gameScore } = useContext(GameStateContext);
  return (
    <View>
      <TextComponent>Score is: {gameScore}</TextComponent>
    </View>
  );
};

export default Score;
