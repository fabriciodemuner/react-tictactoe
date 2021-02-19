import { Box, Button, ChakraProps, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { JoinOption } from "../types";

type NamedRoomInfoProps = {
  socket: Socket;
  option: JoinOption;
} & ChakraProps;

export const NamedRoomInfo = (props: NamedRoomInfoProps) => {
  const { socket, option } = props;
  const [name, setName] = useState("");

  const sendName = () => {
    console.log("sending name", option, name);
    if (option) socket.emit(option, name);
  };

  return (
    <Box>
      <Text>
        fill in the name of the room and click the button below to advance
      </Text>
      <Input
        mt={4}
        placeholder="room name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Button onClick={sendName} display="block" mx="auto" mt={4}>
        {option.replace("-room", "")} room
      </Button>
    </Box>
  );
};
