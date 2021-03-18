import { Center } from "@chakra-ui/react";
import { CheckersPiece, CheckersPlayer } from "../types";
import { CheckersGamePiece } from "../common/Piece";

interface CheckersGameTileProps {
  row: number;
  col: number;
  currentPlayer: CheckersPlayer;
  role: CheckersPlayer;
  piece: CheckersPiece | undefined;
  gameOver: boolean;
  freeze: boolean;
  handleTileClick: (row: number, col: number, piece?: CheckersPiece) => void;
}

export const CheckersGameTile = (props: CheckersGameTileProps) => {
  const {
    row,
    col,
    currentPlayer,
    role,
    piece,
    gameOver,
    freeze,
    handleTileClick,
  } = props;

  const handleClick = () => {
    if (!gameOver && !freeze && role === currentPlayer)
      handleTileClick(row, col, piece);
  };

  return (
    <Center onClick={handleClick} fontSize="3xl" bg="lightslategray">
      {piece && <CheckersGamePiece piece={piece} />}
    </Center>
  );
};
