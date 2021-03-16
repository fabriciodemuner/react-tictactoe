import { Box } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
import { CheckersPlayer } from "../types";

interface CheckersGamePieceProps {
  role: CheckersPlayer;
  crown: boolean;
}

export const CheckersGamePiece = (props: CheckersGamePieceProps) => {
  const { role, crown } = props;
  const color = role === "W" ? "floralwhite" : "#454545";

  return (
    <>
      <Box position="absolute" border="1px" borderRadius="1rem">
        <FaCircle color={color} />
      </Box>
      {crown && (
        <Box mb="0.6rem" position="absolute" border="1px" borderRadius="1rem">
          <FaCircle color={color} />
        </Box>
      )}
    </>
  );
};
