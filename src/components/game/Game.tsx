import {
  Box,
  Button,
  Center,
  ChakraProps,
  Flex,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Socket } from "socket.io-client";
import { Player, Result, Score, Tiles } from "../../common/types";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { GameOverModal } from "./alerts/GameOverModal";
import { NewGameAlert } from "./alerts/NewGameAlert";
import { ResetScoreAlert } from "./alerts/ResetScoreAlert";
import { SurrenderAlert } from "./alerts/SurrenderAlert";
import { GameTile } from "./GameTile";

type GameProps = {
  socket: Socket;
  tiles: Tiles;
  role: Player;
  currentPlayer: Player;
  gameOver: boolean;
  result: Result | undefined;
  score: Score;
  resetRequest: boolean;
  freeze: boolean;
  opponentSurrender: boolean;
  resetScoreAlert: boolean;
} & ChakraProps;

export const Game = (props: GameProps) => {
  const {
    socket,
    tiles,
    role,
    currentPlayer,
    gameOver,
    result,
    score,
    resetRequest,
    freeze,
    opponentSurrender,
    resetScoreAlert,
  } = props;

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
                .join(" | ")}{" "}
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
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap="1"
        >
          {[...Array(9)].map((_, i) => (
            <GameTile
              id={i + 1}
              role={role}
              currentPlayer={currentPlayer}
              playedBy={tiles[(i + 1) as keyof Tiles]}
              gameOver={gameOver}
              freeze={freeze}
              socket={socket}
            />
          ))}
        </Grid>
      </Grid>

      <NewGameAlert socket={socket} resetRequest={resetRequest} />
      <SurrenderAlert socket={socket} opponentSurrender={opponentSurrender} />
      <ResetScoreAlert socket={socket} resetScoreAlert={resetScoreAlert} />
      <GameOverModal
        socket={socket}
        gameOver={gameOver}
        result={result}
        isOpenModal={isOpenModal}
        closeModal={closeModal}
      />
    </Box>
  );
};
