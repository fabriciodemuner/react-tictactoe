import { ChakraProvider, theme } from "@chakra-ui/react";
import React, { useState } from "react";
import { io } from "socket.io-client";
import { HOST } from "./config/default";
import { Game, Result, Tiles } from "./Game";
import { Player } from "./TicTile";

console.log(process.env.NEXT_PUBLIC_API_HOST, HOST);
const socket = io(HOST);
export type Score = {
  O: number;
  X: number;
  D: number;
};
type GameData = { tiles: Tiles; currentPlayer: Player; role: Player };
type GameState = {
  score: Score;
  players: { O: string; X: string };
  currentPlayer: Player;
  gameOver: boolean;
  resetRequest: boolean;
  result: Result;
  tiles: {
    1: Player;
    2: Player;
    3: Player;
    4: Player;
    5: Player;
    6: Player;
    7: Player;
    8: Player;
    9: Player;
  };
};

export const App = () => {
  const [tiles, setTiles] = useState<Tiles>({
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
    8: undefined,
    9: undefined,
  });
  const [currentPlayer, setCurrentPlayer] = useState<Player>();
  const [role, setRole] = useState<Player>();
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState<Result>();
  const [score, setScore] = useState<Score>({ O: 0, X: 0, D: 0 });
  const [resetRequest, setResetRequest] = useState(false);

  const setupGame = async (data: GameData) => {
    setTiles(data.tiles);
    setCurrentPlayer(data.currentPlayer);
    setRole(data.role);
  };

  socket.on("connect", () => {
    socket.send("hi");

    socket.on("message", (message: string) => {
      console.log(message);
    });

    socket.on("new-user", (message: string) => {
      console.log(message);
    });

    socket.on("setup", async (data: GameData) => {
      console.log("Setting up:", data);
      await setupGame(data);
    });

    socket.on("game-state", (data: GameState) => {
      console.log("GameState updated", data);
      setTiles(data.tiles);
      setCurrentPlayer(data.currentPlayer);
      setGameOver(data.gameOver);
      setResult(data.result);
      setScore(data.score);
      setResetRequest(data.resetRequest);
    });

    socket.on("teste", (m: string) => console.log(m));
    socket.on("reset-start", () => {
      setResetRequest(true);
    });
    socket.on("reset-cancel", () => {
      setResetRequest(false);
    });
    socket.on("user-disconnected", (message: string) => {
      console.log(message);
    });
  });

  if (!currentPlayer || !role)
    return <div>Loading... (Most likely waiting for opponent)</div>;

  return (
    <ChakraProvider theme={theme}>
      <Game
        socket={socket}
        tiles={tiles}
        role={role}
        currentPlayer={currentPlayer}
        gameOver={gameOver}
        result={result}
        score={score}
        resetRequest={resetRequest}
        textAlign="center"
        maxWidth="900px"
        mx="auto"
      />
    </ChakraProvider>
  );
};
