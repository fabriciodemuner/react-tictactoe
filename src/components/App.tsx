import { ChakraProvider, theme } from "@chakra-ui/react";
import React from "react";
import { TicTacToe } from "./tictactoe/TicTacToe";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <TicTacToe />
    </ChakraProvider>
  );
};
