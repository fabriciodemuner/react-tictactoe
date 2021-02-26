import { Center } from "@chakra-ui/react";
import React from "react";
import { Socket } from "socket.io-client";
import { TTTPlayer } from "../types";

interface TTTGameTileProps {
  id: number;
  currentPlayer: TTTPlayer;
  role: TTTPlayer;
  playedBy: TTTPlayer | undefined;
  gameOver: boolean;
  freeze: boolean;
  socket: Socket;
}

export const TTTGameTile = (props: TTTGameTileProps) => {
  const {
    id,
    currentPlayer: player,
    role,
    playedBy,
    gameOver,
    freeze,
    socket,
  } = props;
  const color = !playedBy
    ? undefined
    : playedBy === "O"
    ? "cornflowerblue"
    : "coral";

  const handleTileClick = () => {
    if (!playedBy && !gameOver && !freeze && role === player) {
      socket.emit("tile-clicked", { id, player });
    }
  };

  return (
    <Center onClick={handleTileClick} border="1px" fontSize="7xl" bg={color}>
      {playedBy}
    </Center>
  );
};
