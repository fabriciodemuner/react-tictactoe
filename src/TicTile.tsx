import { Center } from "@chakra-ui/react";
import React from "react";
import { Socket } from "socket.io-client";

export type Player = "O" | "X";

interface TicTileProps {
  id: number;
  currentPlayer: Player;
  role: Player;
  playedBy: Player | undefined;
  gameOver: boolean;
  socket: Socket;
}

export const TicTile = (props: TicTileProps) => {
  const { id, currentPlayer: player, role, playedBy, gameOver, socket } = props;
  const color = !playedBy
    ? undefined
    : playedBy === "O"
    ? "cornflowerblue"
    : "coral";

  const handleTileClick = () => {
    if (!playedBy && !gameOver && role === player) {
      socket.emit("tile-clicked", { id, player });
    }
  };

  return (
    <Center onClick={handleTileClick} border="1px" fontSize="7xl" bg={color}>
      {playedBy}
    </Center>
  );
};
