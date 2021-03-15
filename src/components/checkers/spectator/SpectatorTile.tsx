import { Center } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
import { CheckersPlayer } from "../types";

interface CheckersSpectatorTileProps {
  playedBy: CheckersPlayer | undefined;
}

export const CheckersSpectatorTile = (props: CheckersSpectatorTileProps) => {
  const { playedBy } = props;
  const color = playedBy === "W" ? "floralwhite" : "#454545";

  return (
    <Center fontSize="3xl" bg="lightslategray">
      {playedBy && <FaCircle color={color} />}
    </Center>
  );
};
