import { Box, Button, ChakraProps, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Socket } from "socket.io-client";

type ResumeMatchInfoProps = {
  socket: Socket;
} & ChakraProps;

export const ResumeMatchInfo = (props: ResumeMatchInfoProps) => {
  const { socket } = props;
  const [matchId, setMatchId] = useState("");

  const sendName = () => {
    console.log("sending match identifier", matchId);
    socket.emit("resume-match", matchId);
  };

  return (
    <Box>
      <Text>
        Fill in the identifier of the match you wish to resume and click the
        button below to advance
      </Text>
      <Input
        mt={4}
        placeholder="match identifier"
        value={matchId}
        onChange={e => setMatchId(e.target.value)}
      />
      <Button onClick={sendName} display="block" mx="auto" mt={4}>
        resume match
      </Button>
    </Box>
  );
};
