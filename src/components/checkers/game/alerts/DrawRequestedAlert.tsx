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

interface CheckersDrawRequestedAlertProps {
  socket: Socket;
  drawRequested: boolean;
}

export const CheckersDrawRequestedAlert = (
  props: CheckersDrawRequestedAlertProps
) => {
  const { socket, drawRequested } = props;
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog
      isOpen={drawRequested}
      leastDestructiveRef={cancelRef}
      onClose={() => {}}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Your opponent proposes a draw.
          </AlertDialogHeader>

          <AlertDialogBody>Do you confirm?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => socket.send("draw-cancel")}>
              No
            </Button>
            <Button
              colorScheme="red"
              onClick={() => socket.send("draw-confirm")}
              ml={3}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
