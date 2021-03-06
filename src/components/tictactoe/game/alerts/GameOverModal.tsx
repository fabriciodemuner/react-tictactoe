import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Socket } from "socket.io-client";
import { TTTResult } from "../../types";

interface TTTGameOverModalProps {
  socket: Socket;
  gameOver: boolean;
  result: TTTResult;
  isOpenModal: boolean;
  closeModal: () => void;
}

export const TTTGameOverModal = (props: TTTGameOverModalProps) => {
  const { socket, gameOver, result, isOpenModal, closeModal } = props;

  return (
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
            ml={3}
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
  );
};
