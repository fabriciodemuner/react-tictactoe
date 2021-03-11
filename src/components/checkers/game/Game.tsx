import {
  Box,
  Button,
  Center,
  ChakraProps,
  Flex,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import {
  CheckersTilesPerRow,
  CheckersPlayer,
  CheckersResult,
  CheckersScore,
  CheckersTiles,
  CheckersRows,
} from "../types";
import { CheckersGameOverModal } from "./alerts/GameOverModal";
import { CheckersResetScoreRequestedAlert } from "./alerts/ResetScoreRequestedAlert";
import { CheckersStartResetScoreAlert } from "./alerts/StartResetScoreAlert";
import { CheckersDrawRequestedAlert } from "./alerts/DrawRequestedAlert";
import { CheckersGameTile } from "./GameTile";

type CheckersGameProps = {
  socket: Socket;
  tiles: CheckersTiles;
  role: CheckersPlayer;
  currentPlayer: CheckersPlayer;
  gameOver: boolean;
  result: CheckersResult;
  score: CheckersScore;
  startResetScoreAlert: boolean;
  resetScoreRequested: boolean;
  freeze: boolean;
  drawRequested: boolean;
} & ChakraProps;

export const CheckersGame = (props: CheckersGameProps) => {
  const {
    socket,
    tiles,
    role,
    currentPlayer,
    gameOver,
    result,
    score,
    startResetScoreAlert,
    resetScoreRequested,
    freeze,
    drawRequested,
  } = props;

  const [moveFrom, setMoveFrom] = useState<{ row: number; col: number }>();
  const [moveTo, setMoveTo] = useState<{ row: number; col: number }>();

  const {
    isOpen: isOpenModal,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  useEffect(() => {
    if (gameOver) {
      openModal();
    }
  }, [gameOver, openModal]);

  const handleTileClick = (
    row: number,
    col: number,
    piece?: CheckersPlayer
  ) => {
    console.log({ row, col }, piece, moveFrom, moveTo);
    if (piece && piece === role) setMoveFrom({ row, col });
    if (piece && piece !== role && moveFrom) setMoveTo({ row, col });
    if (!piece && moveFrom) setMoveTo({ row, col });
  };

  useEffect(() => {
    if (moveFrom && moveTo) {
      socket.emit("piece-moved", { moveFrom, moveTo });
      setMoveFrom(undefined);
      setMoveTo(undefined);
    }
  }, [moveFrom, moveTo, socket]);

  return (
    <Box {...props}>
      <Grid height="100vh" p={3} templateRows="1fr 9fr">
        <Flex mb={4} flexDir="row">
          <ColorModeSwitcher ml="0" width="10%" />
          <Grid
            gridTemplateColumns="3fr 1fr"
            gridTemplateRows="1fr 1fr"
            alignItems="center"
            flex="1"
          >
            <Center fontSize="md" ml={`${500 / 27}%`}>
              {Object.entries(score)
                .map(el => `${el[0]}: ${el[1]}`)
                .join(" | ")}
            </Center>
            <Button
              m="0"
              size="xs"
              onClick={() => {
                if (!freeze && (gameOver || currentPlayer === role))
                  socket.send("reset-alert");
              }}
            >
              Reset score
            </Button>
            <Center fontSize="xl" ml={`${500 / 27}%`}>
              Playing as: {role} |
              {freeze || currentPlayer !== role ? ` Wait` : ` Your turn`}
            </Center>
            <Button
              size="xs"
              onClick={() => {
                if (!freeze && (gameOver || currentPlayer === role))
                  openModal();
              }}
            >
              New match
            </Button>
          </Grid>
        </Flex>
        <Grid
          templateRows={`repeat(${CheckersRows}, 1fr)`}
          templateColumns={`repeat(${CheckersTilesPerRow}, 1fr)`}
          gap="1"
        >
          {[...Array(CheckersRows)].map((_, row) =>
            [...Array(CheckersTilesPerRow)].map((_, col) => (
              <CheckersGameTile
                row={row}
                col={col}
                role={role}
                currentPlayer={currentPlayer}
                piece={
                  tiles[
                    (row * CheckersTilesPerRow + col + 1) as keyof CheckersTiles
                  ]
                }
                gameOver={gameOver}
                freeze={freeze}
                handleTileClick={handleTileClick}
              />
            ))
          )}
        </Grid>
      </Grid>

      <CheckersResetScoreRequestedAlert
        socket={socket}
        resetScoreRequested={resetScoreRequested}
      />
      <CheckersDrawRequestedAlert
        socket={socket}
        drawRequested={drawRequested}
      />
      <CheckersStartResetScoreAlert
        socket={socket}
        startResetScoreAlert={startResetScoreAlert}
      />
      <CheckersGameOverModal
        socket={socket}
        gameOver={gameOver}
        result={result}
        isOpenModal={isOpenModal}
        closeModal={closeModal}
      />
    </Box>
  );
};