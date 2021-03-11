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
  CheckersPlayer,
  CheckersResult,
  CheckersRole,
  CheckersScore,
  CheckersTiles,
} from "./types";

type CheckersProps = {
  socket: Socket;
};

export const Checkers = (props: CheckersProps) => {
  const { socket } = props;
  const [tiles, setTiles] = useState<CheckersTiles>(() => {
    return {
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
      7: undefined,
      8: undefined,
      9: undefined,
      10: undefined,
      11: undefined,
      12: undefined,
      13: undefined,
      14: undefined,
      15: undefined,
      16: undefined,
      17: undefined,
      18: undefined,
      19: undefined,
      20: undefined,
      21: undefined,
      22: undefined,
      23: undefined,
      24: undefined,
      25: undefined,
      26: undefined,
      27: undefined,
      28: undefined,
      29: undefined,
      30: undefined,
      31: undefined,
      32: undefined,
      33: undefined,
      34: undefined,
      35: undefined,
      36: undefined,
      37: undefined,
      38: undefined,
      39: undefined,
      40: undefined,
      41: undefined,
      42: undefined,
      43: undefined,
      44: undefined,
      45: undefined,
      46: undefined,
      47: undefined,
      48: undefined,
      49: undefined,
      50: undefined,
      51: undefined,
      52: undefined,
      53: undefined,
      54: undefined,
      55: undefined,
      56: undefined,
      57: undefined,
      58: undefined,
      59: undefined,
      60: undefined,
      61: undefined,
      62: undefined,
      63: undefined,
      64: undefined,
    };
  });
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
    setTiles(data.tiles);
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
    setTiles(data.tiles);
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
        tiles={tiles}
        score={score}
        textAlign="center"
        maxWidth="900px"
        mx="auto"
      />
    );

  return (
    <CheckersGame
      socket={socket}
      tiles={tiles}
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
