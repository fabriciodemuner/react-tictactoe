import { Text, Flex, Select, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { Games } from "./App";

type SetupProps = {
  socket: Socket;
  userName: string;
  setUserName: (n: string) => void;
};

export const Setup = (props: SetupProps) => {
  const { socket, userName, setUserName } = props;
  const [game, setGame] = useState<Games>();

  const handleClick = () => {
    if (userName && game) {
      socket.emit("setup", { userName, game });
    }
  };

  return (
    <Flex direction="column" height="100%" my="10%" mx="5%">
      <Text>Please fill your username and select a game:</Text>
      <Select
        placeholder="Choose your game"
        onChange={e => setGame(e.target.value as Games)}
        mt={4}
      >
        {Object.entries(Games).map(op => (
          <option value={op[0]}>{op[1]}</option>
        ))}
      </Select>
      <Input
        mt={4}
        placeholder="Username"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
      <Button onClick={() => handleClick()} display="block" mx="auto" mt={4}>
        Start!
      </Button>{" "}
    </Flex>
  );
};
