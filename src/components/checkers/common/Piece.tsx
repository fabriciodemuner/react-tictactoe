import { Box } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
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
        <Box mb="0.6rem" position="absolute" border="1px" borderRadius="1rem">
          <FaCircle color={color} />
        </Box>
      )}
    </>
  );
};
