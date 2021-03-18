import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Socket } from "socket.io-client";
import {
  JoinOption,
  SelectJoinOption,
} from "../common/join-option/SelectJoinOption";
import { WaitingForOpponentAlert } from "./game/alerts/WaitingForOpponentAlert";
import { CheckersGame } from "./game/Game";
import { CheckersSpectatorView } from "./spectator/SpectatorView";
import {
  CheckersGameData,
  CheckersGameState,
  CheckersPiece,
  CheckersPlayer,
  CheckersResult,
  CheckersRole,
  CheckersScore,
} from "./types";

type CheckersProps = {
  socket: Socket;
};

export const Checkers = (props: CheckersProps) => {
  const { socket } = props;
  const [pieces, setPieces] = useState<CheckersPiece[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<CheckersPlayer>();
  const [role, setRole] = useState<CheckersRole>();
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState<CheckersResult>();
  const [score, setScore] = useState<CheckersScore>({
    B: 0,
    W: 0,
    D: 0,
  });
  const [resetScoreRequested, setResetScoreRequested] = useState(false);
  const [startResetScoreAlert, setStartResetScoreAlert] = useState(false);
  const [drawRequested, setDrawRequested] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const [joinOption, setJoinOption] = useState<JoinOption>();
  const [nameTaken, setNameTaken] = useState(false);
  const [notFound, setRoomNotFound] = useState(false);

  const setupGame = (data: CheckersGameData) => {
    setPieces(() => [...pieces, ...data.pieces]);
    setCurrentPlayer(data.currentPlayer);
    setRole(data.role);
    setWaitingForOpponent(data.waitingForOpponent);
    setJoinOption(data.joinOption);
  };

  socket.on("setup", (data: CheckersGameData) => {
    console.log("Setting up:", data);
    setupGame(data);
  });

  socket.on("start-game", () => {
    console.log("Starting new game:");
    setWaitingForOpponent(false);
  });

  socket.on("game-state", (data: CheckersGameState) => {
    console.log("GameState updated", data);
    setPieces(data.pieces);
    setCurrentPlayer(data.currentPlayer);
    setGameOver(data.gameOver);
    setFreeze(data.freeze);
    setResult(data.result);
    setScore(data.score);
    setResetScoreRequested(data.resetRequested);
    setWaitingForOpponent(data.waitingForOpponent);
  });

  socket.on("freeze", () => {
    setFreeze(true);
    setStartResetScoreAlert(false);
  });

  socket.on("draw-start", () => {
    setDrawRequested(true);
  });
  socket.on("draw-cancel", () => {
    setDrawRequested(false);
    setFreeze(false);
  });

  socket.on("reset-alert", () => {
    setStartResetScoreAlert(true);
  });
  socket.on("reset-start", () => {
    setResetScoreRequested(true);
  });
  socket.on("reset-cancel", () => {
    setStartResetScoreAlert(false);
    setResetScoreRequested(false);
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
      <CheckersSpectatorView
        pieces={pieces}
        score={score}
        textAlign="center"
        maxWidth="900px"
        mx="auto"
      />
    );

  return (
    <CheckersGame
      socket={socket}
      pieces={pieces}
      role={role}
      currentPlayer={currentPlayer}
      gameOver={gameOver}
      freeze={freeze}
      result={result}
      score={score}
      resetScoreRequested={resetScoreRequested}
      drawRequested={drawRequested}
      startResetScoreAlert={startResetScoreAlert}
      textAlign="center"
      maxWidth="900px"
      mx="auto"
    />
  );
};
