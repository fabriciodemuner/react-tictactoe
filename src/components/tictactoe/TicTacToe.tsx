import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { io } from "socket.io-client";
import { HOST } from "../../config/default";
import { WaitingForOpponentAlert } from "./game/alerts/WaitingForOpponentAlert";
import { Game } from "./game/Game";
import { SpectatorView } from "./spectator/SpectatorView";
import {
  GameData,
  GameState,
  Player,
  Result,
  Role,
  Score,
  Tiles,
} from "./types";

const socket = io(HOST);

export const TicTacToe = () => {
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
  const [role, setRole] = useState<Role>();
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState<Result>();
  const [score, setScore] = useState<Score>({ O: 0, X: 0, D: 0 });
  const [resetScoreRequest, setResetScoreRequest] = useState(false);
  const [resetScoreAlert, setResetScoreAlert] = useState(false);
  const [opponentSurrender, setOpponentSurrender] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);

  const setupGame = (data: GameData) => {
    setTiles(data.tiles);
    setCurrentPlayer(data.currentPlayer);
    setRole(data.role);
    setWaitingForOpponent(data.waitingForOpponent);
  };

  socket.on("connect", () => {
    socket.on("setup", (data: GameData) => {
      console.log("Setting up:", data);
      setupGame(data);
    });

    socket.on("start-game", () => {
      console.log("Starting new game:");
      setWaitingForOpponent(false);
    });

    socket.on("game-state", (data: GameState) => {
      console.log("GameState updated", data);
      setTiles(data.tiles);
      setCurrentPlayer(data.currentPlayer);
      setGameOver(data.gameOver);
      setFreeze(data.freeze);
      setResult(data.result);
      setScore(data.score);
      setResetScoreRequest(data.resetRequest);
      setOpponentSurrender(data.opponentSurrender);
      setWaitingForOpponent(data.waitingForOpponent);
    });

    socket.on("freeze", () => {
      setFreeze(true);
      setResetScoreAlert(false);
    });

    socket.on("opp-surrender", () => {
      setFreeze(true);
      setOpponentSurrender(true);
    });

    socket.on("reset-alert", () => {
      setResetScoreAlert(true);
    });
    socket.on("reset-start", () => {
      setResetScoreRequest(true);
    });
    socket.on("reset-cancel", () => {
      setResetScoreAlert(false);
      setResetScoreRequest(false);
      setFreeze(false);
    });
  });

  if (waitingForOpponent)
    return <WaitingForOpponentAlert waitingForOpponent={waitingForOpponent} />;

  if (!currentPlayer || !role) return <Box>Loading...</Box>;

  return (
    <div>
      {role === "S" ? (
        <SpectatorView
          tiles={tiles}
          score={score}
          textAlign="center"
          maxWidth="900px"
          mx="auto"
        />
      ) : (
        <Game
          socket={socket}
          tiles={tiles}
          role={role}
          currentPlayer={currentPlayer}
          gameOver={gameOver}
          freeze={freeze}
          result={result}
          score={score}
          resetRequest={resetScoreRequest}
          opponentSurrender={opponentSurrender}
          resetScoreAlert={resetScoreAlert}
          textAlign="center"
          maxWidth="900px"
          mx="auto"
        />
      )}
    </div>
  );
};
