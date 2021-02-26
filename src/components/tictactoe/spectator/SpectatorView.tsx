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
import React, { useRef, useState } from "react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { TTTScore, TTTTiles } from "../types";
import { TTTSpectatorTile } from "./SpectatorTile";

type TTTSpectatorViewProps = {
  tiles: TTTTiles;
  score: TTTScore;
} & ChakraProps;

export const TTTSpectatorView = (props: TTTSpectatorViewProps) => {
  const { tiles, score } = props;
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
                .join(" | ")}{" "}
            </Center>
            <Center fontSize="xl">Spectator</Center>
          </Flex>
        </Flex>
        <Grid
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap="1"
        >
          {[...Array(9)].map((_, i) => (
            <TTTSpectatorTile playedBy={tiles[(i + 1) as keyof TTTTiles]} />
          ))}
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
