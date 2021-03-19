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
import { CheckersResult } from "../../types";

interface CheckersGameOverModalProps {
  socket: Socket;
  gameOver: boolean;
  result: CheckersResult;
  isOpenModal: boolean;
  closeModal: () => void;
}

export const CheckersGameOverModal = (props: CheckersGameOverModalProps) => {
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
        <ModalHeader>{gameOver ? "Game Over!" : "Propose Draw"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!gameOver
            ? "The game is not finished! Do you want to propose a draw and start a new game?"
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
              gameOver ? socket.send("new-game") : socket.send("draw-start");
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
