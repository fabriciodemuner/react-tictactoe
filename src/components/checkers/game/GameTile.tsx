import { Center } from "@chakra-ui/react";
import { CheckersPlayer } from "../types";
import { CheckersGamePiece } from "./GamePiece";

interface CheckersGameTileProps {
  row: number;
  col: number;
  currentPlayer: CheckersPlayer;
  role: CheckersPlayer;
  piece: CheckersPlayer | undefined;
  crown: boolean;
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
    crown,
    gameOver,
    freeze,
    handleTileClick,
  } = props;

  const handleClick = () => {
    if (!gameOver && !freeze && role === player)
      handleTileClick(row, col, piece);
  };

  return (
    <Center onClick={handleClick} fontSize="3xl" bg="lightslategray">
      {piece && <CheckersGamePiece role={piece} crown={crown} />}
    </Center>
  );
};
