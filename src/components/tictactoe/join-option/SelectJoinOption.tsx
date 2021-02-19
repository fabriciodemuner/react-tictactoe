import { Box, ChakraProps, Flex, Select, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { JoinOption } from "../types";
import { NamedRoomInfo } from "./NamedRoomInfo";
import { RandomRoomInfo } from "./RandomRoomInfo";

type GameProps = {
  socket: Socket;
} & ChakraProps;

export const SelectJoinOption = (props: GameProps) => {
  const { socket } = props;
  const [option, setOption] = useState<JoinOption>();

  return (
    <Flex direction="column" height="100%" my="10%" mx="5%">
      <Text>how would you like to join the game?</Text>
      <Select
        placeholder="select option"
        onChange={e => setOption(e.target.value as JoinOption)}
        mt={4}
      >
        {Object.entries(JoinOption).map(op => (
          <option value={op[1]}>{`${op[0]} room`}</option>
        ))}
      </Select>
      <Box mt={5} mx="5%" w="90%">
        {option === JoinOption.random && <RandomRoomInfo socket={socket} />}
        {option && option !== JoinOption.random && (
          <NamedRoomInfo option={option} socket={socket} />
        )}
      </Box>
    </Flex>
  );
};
