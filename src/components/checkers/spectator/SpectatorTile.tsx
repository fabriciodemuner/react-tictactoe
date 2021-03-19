import { Center } from "@chakra-ui/react";
import { CheckersGamePiece } from "../common/Piece";
import { CheckersPiece } from "../types";

interface CheckersSpectatorTileProps {
  piece: CheckersPiece | undefined;
}

export const CheckersSpectatorTile = (props: CheckersSpectatorTileProps) => {
  const { piece } = props;

  return (
    <Center fontSize="3xl" bg="lightslategray">
      {piece && <CheckersGamePiece piece={piece} />}
    </Center>
  );
};
