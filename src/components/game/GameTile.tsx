import { Center } from "@chakra-ui/react";
import React from "react";
import { Socket } from "socket.io-client";
import { Player } from "../../common/types";

interface GameTileProps {
  id: number;
  currentPlayer: Player;
  role: Player;
  playedBy: Player | undefined;
  gameOver: boolean;
  freeze: boolean;
  socket: Socket;
}

export const GameTile = (props: GameTileProps) => {
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
