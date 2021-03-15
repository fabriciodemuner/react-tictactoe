import { Center } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
import { CheckersPlayer } from "../types";

interface CheckersGameTileProps {
  row: number;
  col: number;
  currentPlayer: CheckersPlayer;
  role: CheckersPlayer;
  piece: CheckersPlayer | undefined;
  gameOver: boolean;
  freeze: boolean;
  handleTileClick: (row: number, col: number, piece?: CheckersPlayer) => void;
}

export const CheckersGameTile = (props: CheckersGameTileProps) => {
  const {
    row,
    col,
    currentPlayer: player,
    role,
    piece,
    gameOver,
    freeze,
    handleTileClick,
  } = props;
  const color = piece === "W" ? "floralwhite" : "#454545";

  const handleClick = () => {
    if (!gameOver && !freeze && role === player)
      handleTileClick(row, col, piece);
  };

  return (
    <Center onClick={handleClick} fontSize="3xl" bg="lightslategray">
      {piece && <FaCircle color={color} />}
    </Center>
  );
};
