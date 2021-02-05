import { Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export type Player = "O" | "X";

interface TicTileProps {
  id: number;
  currentPlayer: Player;
  checkResult: (id: number) => void;
  gameOver: boolean;
  resetTics: boolean;
}

export const TicTile = (props: TicTileProps) => {
  const { id, currentPlayer: player, checkResult, gameOver, resetTics } = props;
  const [playedBy, setPlayedBy] = useState<Player>();
  const color = !playedBy
    ? undefined
    : playedBy === "O"
    ? "cornflowerblue"
    : "coral";

  useEffect(() => {
    if (resetTics) {
      setPlayedBy(undefined);
    }
  }, [resetTics]);

  const handleTileClick = () => {
    if (!playedBy && !gameOver) {
      setPlayedBy(player);
      checkResult(id);
    }
  };

  return (
    <Center onClick={handleTileClick} border="1px" fontSize="7xl" bg={color}>
      {playedBy}
    </Center>
  );
};
