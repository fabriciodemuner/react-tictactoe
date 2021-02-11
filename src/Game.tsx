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
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Player, TicTile } from "./TicTile";

type Result = Player | "D";

export const Game = (props: ChakraProps) => {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const [firstPlayer, setFirstPlayer] = useState<Player>("O");
  const [currentPlayer, setCurrentPlayer] = useState<Player>("O");
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState<Result>();
  const [resetTics, setResetTics] = useState(false);
  const [oPlayed, setOPlayed] = useState<number[]>([]);
  const [xPlayed, setXPlayed] = useState<number[]>([]);
  const [userTriggeredRestart, setUserTriggeredRestart] = useState(false);
  const [score, setScore] = useState({ O: 0, X: 0, D: 0 });
  const [scoreAlert, setScoreAlert] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const winningPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const addPoint = (p: Result) => {
    const newScore = { ...score };
    newScore[p]++;
    setScore(newScore);
  };

  const checkResult = (id: number) => {
    const playedArray = currentPlayer === "O" ? oPlayed : xPlayed;
    playedArray.push(id);
    let win = false;
    winningPositions.forEach(pos => {
      if (pos.every(elem => playedArray.includes(elem))) {
        win = true;
      }
    });
    if (win) {
      setGameOver(true);
      setResult(currentPlayer);
      addPoint(currentPlayer);
      return;
    }
    if (oPlayed.length + xPlayed.length === 9) {
      setGameOver(true);
      setResult("D");
      addPoint("D");
      return;
    }
    if (currentPlayer === "O") {
      setOPlayed(playedArray);
    } else {
      setXPlayed(playedArray);
    }
    togglePlayer();
  };

  const togglePlayer = () => {
    if (currentPlayer === "O") setCurrentPlayer("X");
    else setCurrentPlayer("O");
  };

  const toggleFirstPlayer = () => {
    if (firstPlayer === "O") setFirstPlayer("X");
    else setFirstPlayer("O");
  };

  const resetGame = () => {
    setUserTriggeredRestart(false);
    toggleFirstPlayer();
    setOPlayed([]);
    setXPlayed([]);
    setResetTics(true);
    setResult(undefined);
    setGameOver(false);
  };

  useEffect(() => {
    if (gameOver) {
      onOpenModal();
    } else {
      setResetTics(false);
    }
  }, [gameOver, resetTics, onOpenModal]);

  useEffect(() => {
    if (userTriggeredRestart) {
      addPoint("D");
      resetGame();
    }
    // eslint-disable-next-line
  }, [userTriggeredRestart]);

  useEffect(() => {
    setCurrentPlayer(firstPlayer);
  }, [firstPlayer]);

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
              O: {score.O} | X: {score.X} | D: {score.D}
            </Center>
            <Button m="0" size="xs" onClick={() => setScoreAlert(true)}>
              Reset score
            </Button>
            <Center fontSize="xl" ml={`${500 / 27}%`}>
              Player: {currentPlayer}
            </Center>
            <Button size="xs" onClick={() => onOpenModal()}>
              Restart match
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
              currentPlayer={currentPlayer}
              checkResult={checkResult}
              gameOver={gameOver}
              resetTics={resetTics}
            />
          ))}
        </Grid>
      </Grid>

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
              This will reset the score and restart the match. Are you sure you
              want to continue?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setScoreAlert(false)}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  setScore({ O: 0, X: 0, D: 0 });
                  resetGame();
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
        onClose={onCloseModal}
        isOpen={isOpenModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{gameOver ? "Game Over!" : "Reset"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!gameOver
              ? "The game is not finished! If you restart the match, it will count as a draw. Start new game?"
              : result === "D"
              ? `It's a Draw! Start new game?`
              : `Player ${result} won! Start new game?`}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                onCloseModal();
                gameOver ? resetGame() : setUserTriggeredRestart(true);
              }}
            >
              New game
            </Button>
            <Button variant="ghost" onClick={onCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
