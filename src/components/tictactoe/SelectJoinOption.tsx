import { Box, Button, ChakraProps, Flex, Select, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { JoinOption } from "./types";

type GameProps = {
  socket: Socket;
} & ChakraProps;

export const SelectJoinOption = (props: GameProps) => {
  const { socket } = props;

  const [option, setOption] = useState<JoinOption>();

  const sendRandom = () => {
    console.log("this is a test", option, socket);
    if (option) socket.emit(option);
  };

  return (
    <Flex direction="column" height="100%" my="10%" mx="5%">
      <Text>How would you like to join the game?</Text>
      <Select
        placeholder="Select option"
        onChange={e => setOption(e.target.value as JoinOption)}
        mt={4}
      >
        {Object.entries(JoinOption).map(op => (
          <option value={op[1]}>{`${op[0]} Room`}</option>
        ))}
      </Select>
      {option === JoinOption.Random && (
        <Box mt={5} mx="auto">
          <Text>You will join a random room.</Text>
          <Text mt={2}>
            Click the button below to confirm or change your selection.
          </Text>
          <Button onClick={sendRandom} display="block" mx="auto" mt={4}>
            I want to join a random room
          </Button>
        </Box>
      )}
    </Flex>
  );
};
