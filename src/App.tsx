import React, { useEffect, useRef, useState } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Center,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";

type Player = "O" | "X";

interface TicItemProps {
  id: number;
  currentPlayer: Player;
  checkResult: (id: number) => void;
  gameOver: boolean;
  resetTics: boolean;
}

const TicItem = (props: TicItemProps) => {
  const { id, currentPlayer: player, checkResult, gameOver, resetTics } = props;
  const [playedBy, setPlayedBy] = useState<Player>();
  const color = !playedBy
    ? undefined
    : playedBy === "O"
    ? "cornflowerblue"
    : "coral";

  useEffect(() => {
    if (resetTics) {
      setPlayedBy(undefined);
    }
  }, [resetTics]);

  const handleClick = () => {
    if (!playedBy && !gameOver) {
      setPlayedBy(player);
      checkResult(id);
    }
  };

  return (
    <Center onClick={handleClick} border="1px" fontSize="8xl" bg={color}>
      {playedBy}
    </Center>
  );
};

export const App = () => {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const [currentPlayer, setCurrentPlayer] = useState<"O" | "X">("O");
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState<Player | "draw">();
  const [resetTics, setResetTics] = useState(false);
  const [oPlayed, setOPlayed] = useState<number[]>([]);
  const [xPlayed, setXPlayed] = useState<number[]>([]);
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

  const addPoint = (p: "O" | "X" | "D") => {
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
      setResult("draw");
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

  const resetGame = () => {
    togglePlayer();
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

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" maxWidth="900px" mx="auto">
        <Grid height="100vh" p={3} templateRows="1fr 9fr">
          <Flex mb={4} flexDir="column">
            <ColorModeSwitcher ml="auto" justifySelf="flex-end" />
            <Flex>
              <Center fontSize="md" margin="auto">
                O: {score.O} | X: {score.X} | D: {score.D}
              </Center>
              <Button size="sm" onClick={() => setScoreAlert(true)}>
                Reset score
              </Button>
            </Flex>
            <Center fontSize="xl" margin="auto" onClick={onOpenModal}>
              Player: {currentPlayer}
            </Center>
          </Flex>
          <Grid
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap="1"
          >
            <TicItem
              id={1}
              currentPlayer={currentPlayer}
              checkResult={checkResult}
              gameOver={gameOver}
              resetTics={resetTics}
            />
            <TicItem
              id={2}
              currentPlayer={currentPlayer}
              checkResult={checkResult}
              gameOver={gameOver}
              resetTics={resetTics}
            />
            <TicItem
              id={3}
              currentPlayer={currentPlayer}
              checkResult={checkResult}
              gameOver={gameOver}
              resetTics={resetTics}
            />
            <TicItem
              id={4}
              currentPlayer={currentPlayer}
              checkResult={checkResult}
              gameOver={gameOver}
              resetTics={resetTics}
            />
            <TicItem
              id={5}
              currentPlayer={currentPlayer}
              checkResult={checkResult}
              gameOver={gameOver}
              resetTics={resetTics}
            />
            <TicItem
              id={6}
              currentPlayer={currentPlayer}
              checkResult={checkResult}
              gameOver={gameOver}
              resetTics={resetTics}
            />
            <TicItem
              id={7}
              currentPlayer={currentPlayer}
              checkResult={checkResult}
              gameOver={gameOver}
              resetTics={resetTics}
            />
            <TicItem
              id={8}
              currentPlayer={currentPlayer}
              checkResult={checkResult}
              gameOver={gameOver}
              resetTics={resetTics}
            />
            <TicItem
              id={9}
              currentPlayer={currentPlayer}
              checkResult={checkResult}
              gameOver={gameOver}
              resetTics={resetTics}
            />
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
                Are you sure you want to reset the score?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setScoreAlert(false)}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => setScoreAlert(false)}
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
                ? "The game is not finished! Start new game?"
                : result === "draw"
                ? `It's a Draw! Start new game?`
                : `Player ${result} won! Start new game?`}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  onCloseModal();
                  resetGame();
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
    </ChakraProvider>
  );
};
