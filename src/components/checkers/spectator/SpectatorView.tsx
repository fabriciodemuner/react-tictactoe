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
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { CheckersRows, CheckersTilesPerRow, tileIds } from "../constants";
import { CheckersPiece, CheckersScore } from "../types";
import { CheckersSpectatorTile } from "./SpectatorTile";

type CheckersSpectatorViewProps = {
  pieces: CheckersPiece[];
  score: CheckersScore;
} & ChakraProps;

export const CheckersSpectatorView = (props: CheckersSpectatorViewProps) => {
  const { pieces, score } = props;
  const [alert, setAlert] = useState(true);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Box {...props}>
      <Grid height="100vh" p={3} templateRows="1fr 9fr">
        <Flex mb={4} flexDir="row">
          <ColorModeSwitcher ml="0" width="10%" />
          <Flex my="auto" mr="10%" width="100%" flexDirection="column">
            <Center fontSize="md">
              {Object.entries(score)
                .map(el => `${el[0]}: ${el[1]}`)
                .join(" | ")}
            </Center>
            <Center fontSize="xl">Spectator</Center>
          </Flex>
        </Flex>
        <Grid
          templateRows={`repeat(${CheckersRows}, 1fr)`}
          templateColumns={`repeat(${CheckersTilesPerRow}, 1fr)`}
          gap="2px"
        >
          {[...Array(CheckersRows)].map((_, row) =>
            [...Array(CheckersTilesPerRow)].map((_, col) => {
              const id = row * CheckersTilesPerRow + col + 1;
              if (!tileIds.includes(id))
                return <Box fontSize="xl" bg="floralwhite" />;
              const piece = pieces.find(
                p => p.alive && p.pos.row === row && p.pos.col === col
              );
              return <CheckersSpectatorTile piece={piece} />;
            })
          )}
        </Grid>

        <AlertDialog
          isOpen={alert}
          leastDestructiveRef={cancelRef}
          onClose={() => setAlert(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Spectator
              </AlertDialogHeader>

              <AlertDialogBody>
                You joined this game as spectator. Enjoy!
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={() => setAlert(false)}>Ok</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Grid>
    </Box>
  );
};
