import { ChakraProvider, theme } from "@chakra-ui/react";
import { useState } from "react";
import { io } from "socket.io-client";
import { HOST } from "../config/default";
import { Checkers } from "./checkers/Checkers";
import { Setup } from "./Setup";
import { TicTacToe } from "./tictactoe/TicTacToe";

export const games = ["TicTacToe", "Checkers"] as const;
export type Games = typeof games[number];

const socket = io(HOST);

export const App = () => {
  const [userName, setUserName] = useState("");
  const [game, setGame] = useState<Games>();

  socket.on("app-setup", (data: Games) => {
    console.log("Setting game to:", data);
    setGame(data);
  });

  return (
    <ChakraProvider theme={theme}>
      {!game && (
        <Setup socket={socket} userName={userName} setUserName={setUserName} />
      )}
      {game === "TicTacToe" && <TicTacToe socket={socket} />}
      {game === "Checkers" && <Checkers socket={socket} />}
    </ChakraProvider>
  );
};
