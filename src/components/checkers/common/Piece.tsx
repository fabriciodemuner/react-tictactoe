import { Box } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
import { GiQueenCrown } from "react-icons/gi";
import { CheckersPiece } from "../types";

interface CheckersGamePieceProps {
  piece: CheckersPiece;
}

export const CheckersGamePiece = (props: CheckersGamePieceProps) => {
  const { piece } = props;
  const color = piece.role === "W" ? "floralwhite" : "#454545";

  return (
    <>
      <Box position="absolute" border="1px" borderRadius="1rem">
        <FaCircle color={color} />
      </Box>
      {piece.crown && (
        <Box position="absolute" fontSize="2xl">
          <GiQueenCrown color="gold" />
        </Box>
      )}
    </>
  );
};
