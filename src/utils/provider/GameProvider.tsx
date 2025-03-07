import { Children, ReactNode, useEffect, useState } from "react";
import { GameStateContext } from "../context/gameStateContext";
import { GameDifficulty, GameProviderProps, GameStatus } from "../types/common";

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameScore, setGameScoreFnc] = useState(0);
  const [gameStatus, setGameStatusFnc] = useState<GameStatus>("READY");
  const [gameDifficulty, setGameDifficulty] = useState(GameDifficulty.MEDIUM);
  const [appleEaten, setAppleEaten] = useState(0);

  useEffect(() => {
    setGameScoreFnc((prev) => prev + 1);
  }, [appleEaten]);
  return (
    <GameStateContext.Provider
      value={{
        gameStatus: gameStatus,
        setGameStatus: setGameStatusFnc,
        gameScore: gameScore,
        gameDifficulty: gameDifficulty,
        appleEaten: appleEaten,
        setAppleEaten: setAppleEaten,
      }}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameProvider;
