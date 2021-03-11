import { Center } from "@chakra-ui/react";
import { CheckersPlayer } from "../types";

interface CheckersSpectatorTileProps {
  playedBy: CheckersPlayer | undefined;
}

export const CheckersSpectatorTile = (props: CheckersSpectatorTileProps) => {
  const { playedBy } = props;
  const color = !playedBy
    ? undefined
    : playedBy === "W"
    ? "cornflowerblue"
    : "coral";

  return (
    <Center border="1px" fontSize="xl" bg={color}>
      {playedBy}
    </Center>
  );
};
