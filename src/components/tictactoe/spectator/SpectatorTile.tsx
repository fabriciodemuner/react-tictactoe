import { Center } from "@chakra-ui/react";
import React from "react";
import { Player } from "../types";

interface SpectatorTileProps {
  playedBy: Player | undefined;
}

export const SpectatorTile = (props: SpectatorTileProps) => {
  const { playedBy } = props;
  const color = !playedBy
    ? undefined
    : playedBy === "O"
    ? "cornflowerblue"
    : "coral";

  return (
    <Center border="1px" fontSize="7xl" bg={color}>
      {playedBy}
    </Center>
  );
};
