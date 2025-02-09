// src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import GameBoard from "./components/organisms/GameBoard/GameBoardProvider";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
