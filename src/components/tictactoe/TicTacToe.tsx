import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import {
  JoinOption,
  SelectJoinOption,
} from "../common/join-option/SelectJoinOption";
import { WaitingForOpponentAlert } from "./game/alerts/WaitingForOpponentAlert";
import { TicTacToeGame } from "./game/Game";
import { TTTSpectatorView } from "./spectator/SpectatorView";
import {
  TTTGameData,
  TTTGameState,
  TTTPlayer,
  TTTResult,
  TTTRole,
  TTTScore,
  TTTTiles,
} from "./types";

type TicTacToeProps = {
  socket: Socket;
};

export const TicTacToe = (props: TicTacToeProps) => {
  const { socket } = props;
  const [tiles, setTiles] = useState<TTTTiles>({
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
  const [currentPlayer, setCurrentPlayer] = useState<TTTPlayer>();
  const [role, setRole] = useState<TTTRole>();
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState<TTTResult>();
  const [score, setScore] = useState<TTTScore>({
    O: 0,
    X: 0,
    D: 0,
  });
  const [resetScoreRequest, setResetScoreRequest] = useState(false);
  const [resetScoreAlert, setResetScoreAlert] = useState(false);
  const [opponentSurrender, setOpponentSurrender] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const [joinOption, setJoinOption] = useState<JoinOption>();
  const [nameTaken, setNameTaken] = useState(false);
  const [notFound, setRoomNotFound] = useState(false);

  const setupGame = (data: TTTGameData) => {
    setTiles(data.tiles);
    setCurrentPlayer(data.currentPlayer);
    setRole(data.role);
    setWaitingForOpponent(data.waitingForOpponent);
    setJoinOption(data.joinOption);
  };

  socket.on("setup", (data: TTTGameData) => {
    console.log("Setting up:", data);
    setupGame(data);
  });

  socket.on("start-game", () => {
    console.log("Starting new game:");
    setWaitingForOpponent(false);
  });

  socket.on("game-state", (data: TTTGameState) => {
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

  socket.on("room-name-taken", () => {
    console.log("room-name-taken");
    setNameTaken(true);
  });
  socket.on("room-name-taken-ok", () => {
    console.log("room-name-taken-ok");
    setNameTaken(false);
  });

  socket.on("room-not-found", () => {
    console.log("room-not-found");
    setRoomNotFound(true);
  });
  socket.on("room-not-found-ok", () => {
    console.log("room-not-found-ok");
    setRoomNotFound(false);
  });

  if (!joinOption)
    return (
      <SelectJoinOption
        socket={socket}
        nameTaken={nameTaken}
        notFound={notFound}
      />
    );

  if (waitingForOpponent)
    return <WaitingForOpponentAlert waitingForOpponent={waitingForOpponent} />;

  if (!currentPlayer || !role) return <Box>Loading...</Box>;

  if (role === "S")
    return (
      <TTTSpectatorView
        tiles={tiles}
        score={score}
        textAlign="center"
        maxWidth="900px"
        mx="auto"
      />
    );

  return (
    <TicTacToeGame
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
  );
};
