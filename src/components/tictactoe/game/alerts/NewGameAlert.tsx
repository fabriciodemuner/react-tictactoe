import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Socket } from "socket.io-client";

interface TTTNewGameAlertProps {
  socket: Socket;
  resetRequest: boolean;
}

export const TTTNewGameAlert = (props: TTTNewGameAlertProps) => {
  const { socket, resetRequest } = props;
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
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
            <Button ref={cancelRef} onClick={() => socket.send("reset-cancel")}>
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
  );
};
