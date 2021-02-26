import { Box, ChakraProps, Flex, Select, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { NameTakenAlert } from "./alerts/NameTakenAlert";
import { NotFoundAlert } from "./alerts/NotFoundAlert";
import { NamedRoomInfo } from "./NamedRoomInfo";
import { RandomRoomInfo } from "./RandomRoomInfo";

export enum JoinOption {
  random = "random-room",
  create = "create-room",
  join = "join-room",
}

type GameProps = {
  socket: Socket;
  nameTaken: boolean;
  notFound: boolean;
} & ChakraProps;

export const SelectJoinOption = (props: GameProps) => {
  const { socket, nameTaken, notFound } = props;
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

      {nameTaken && <NameTakenAlert socket={socket} nameTaken={nameTaken} />}
      {notFound && <NotFoundAlert socket={socket} notFound={notFound} />}
    </Flex>
  );
};
