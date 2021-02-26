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

interface TTTSurrenderAlertProps {
  socket: Socket;
  opponentSurrender: boolean;
}

export const TTTSurrenderAlert = (props: TTTSurrenderAlertProps) => {
  const { socket, opponentSurrender } = props;
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
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
            <Button ref={cancelRef} onClick={() => socket.send("surrender-ok")}>
              Ok.
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
