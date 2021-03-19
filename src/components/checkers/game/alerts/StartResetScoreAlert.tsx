import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Socket } from "socket.io-client";

interface CheckersStartResetScoreAlertProps {
  socket: Socket;
  startResetScoreAlert: boolean;
}

export const CheckersStartResetScoreAlert = (
  props: CheckersStartResetScoreAlertProps
) => {
  const { socket, startResetScoreAlert } = props;
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog
      isOpen={startResetScoreAlert}
      leastDestructiveRef={cancelRef}
      onClose={() => {}}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Reset score
          </AlertDialogHeader>

          <AlertDialogBody>
            This will reset the score and restart the match. Your opponent needs
            to agree. Are you sure you want to continue?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => socket.send("reset-cancel")}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                socket.send("reset-start");
              }}
              ml={3}
            >
              Yes, reset
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
