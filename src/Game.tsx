import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  ChakraProps,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { Score } from "./App";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Player, TicTile } from "./TicTile";

export type Result = Player | "D";
export type Tiles = {
  1: Player | undefined;
  2: Player | undefined;
  3: Player | undefined;
  4: Player | undefined;
  5: Player | undefined;
  6: Player | undefined;
  7: Player | undefined;
  8: Player | undefined;
  9: Player | undefined;
};

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
  } = props;
  const {
    isOpen: isOpenModal,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [scoreAlert, setScoreAlert] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

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
                if (!freeze && (gameOver || currentPlayer) === role)
                  setScoreAlert(true);
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
                if (!freeze && (gameOver || currentPlayer) === role)
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
            <TicTile
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

      <AlertDialog
        isOpen={resetRequest}
        leastDestructiveRef={cancelRef}
        onClose={() => {}}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Your opponent wants to reset the score.
            </AlertDialogHeader>

            <AlertDialogBody>Do you confirm?</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => socket.send("reset-cancel")}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => socket.send("reset-confirm")}
                ml={3}
              >
                Reset
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={opponentSurrender}
        leastDestructiveRef={cancelRef}
        onClose={() => {}}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Gave Over.
            </AlertDialogHeader>

            <AlertDialogBody>
              Your opponent gave up and you won. A new match will start.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => socket.send("surrender-ok")}
              >
                Ok.
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={scoreAlert}
        leastDestructiveRef={cancelRef}
        onClose={() => setScoreAlert(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Reset score
            </AlertDialogHeader>

            <AlertDialogBody>
              This will reset the score and restart the match. Your opponent
              needs to agree. Are you sure you want to continue?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setScoreAlert(false)}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  socket.send("reset-start");
                  setScoreAlert(false);
                }}
                ml={3}
              >
                Yes, reset
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal
        closeOnOverlayClick={false}
        onClose={closeModal}
        isOpen={isOpenModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{gameOver ? "Game Over!" : "Reset"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!gameOver
              ? "The game is not finished! If you start a new match, it will count as a defeat. Start new game?"
              : result === "D"
              ? `It's a Draw! Start new game?`
              : `Player ${result} won! Start new game?`}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={closeModal}>
              Close
            </Button>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                gameOver ? socket.send("new-game") : socket.send("surrender");
                closeModal();
              }}
            >
              New game
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
