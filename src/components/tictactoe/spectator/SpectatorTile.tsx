import { Center } from "@chakra-ui/react";
import React from "react";
import { TTTPlayer } from "../types";

interface TTTSpectatorTileProps {
  playedBy: TTTPlayer | undefined;
}

export const TTTSpectatorTile = (props: TTTSpectatorTileProps) => {
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
