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
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { TTTPlayer, TTTResult, TTTScore, TTTTiles } from "../types";
import { TTTGameOverModal } from "./alerts/GameOverModal";
import { TTTNewGameAlert } from "./alerts/NewGameAlert";
import { TTTResetScoreAlert } from "./alerts/ResetScoreAlert";
import { TTTSurrenderAlert } from "./alerts/SurrenderAlert";
import { TTTGameTile } from "./GameTile";

type TicTacToeGameProps = {
  socket: Socket;
  tiles: TTTTiles;
  role: TTTPlayer;
  currentPlayer: TTTPlayer;
  gameOver: boolean;
  result: TTTResult;
  score: TTTScore;
  resetRequest: boolean;
  freeze: boolean;
  opponentSurrender: boolean;
  resetScoreAlert: boolean;
} & ChakraProps;

export const TicTacToeGame = (props: TicTacToeGameProps) => {
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
            <TTTGameTile
              id={i + 1}
              role={role}
              currentPlayer={currentPlayer}
              playedBy={tiles[(i + 1) as keyof TTTTiles]}
              gameOver={gameOver}
              freeze={freeze}
              socket={socket}
            />
          ))}
        </Grid>
      </Grid>

      <TTTNewGameAlert socket={socket} resetRequest={resetRequest} />
      <TTTSurrenderAlert
        socket={socket}
        opponentSurrender={opponentSurrender}
      />
      <TTTResetScoreAlert socket={socket} resetScoreAlert={resetScoreAlert} />
      <TTTGameOverModal
        socket={socket}
        gameOver={gameOver}
        result={result}
        isOpenModal={isOpenModal}
        closeModal={closeModal}
      />
    </Box>
  );
};
