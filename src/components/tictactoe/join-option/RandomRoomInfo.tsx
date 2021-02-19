import { Box, Button, ChakraProps, Text } from "@chakra-ui/react";
import React from "react";
import { Socket } from "socket.io-client";
import { JoinOption } from "../types";

type RandomRoomInfoProps = {
  socket: Socket;
} & ChakraProps;

export const RandomRoomInfo = (props: RandomRoomInfoProps) => {
  const { socket } = props;

  const sendRandom = () => {
    console.log("sending random");
    socket.emit(JoinOption.random);
  };

  return (
    <Box>
      <Text>click the button below to confirm or change your selection</Text>
      <Button onClick={sendRandom} display="block" mx="auto" mt={4}>
        join random room
      </Button>
    </Box>
  );
};
