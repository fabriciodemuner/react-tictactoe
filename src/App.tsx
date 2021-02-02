import { ChakraProvider, theme } from "@chakra-ui/react";
import React from "react";
import { Game } from "./Game";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Game textAlign="center" maxWidth="900px" mx="auto" />
    </ChakraProvider>
  );
};
