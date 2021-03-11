import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useRef } from "react";

interface WaitingForOpponentProps {
  waitingForOpponent: boolean;
}

export const WaitingForOpponentAlert = (props: WaitingForOpponentProps) => {
  const { waitingForOpponent } = props;
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog
      isOpen={waitingForOpponent}
      leastDestructiveRef={cancelRef}
      onClose={() => {}}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Waiting for opponent
          </AlertDialogHeader>

          <AlertDialogBody>
            The game will start when your opponent joins the game.
          </AlertDialogBody>

          <AlertDialogFooter />
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
