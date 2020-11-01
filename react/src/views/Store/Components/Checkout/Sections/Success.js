import React from "react";
import {Flex, Text} from "components";
import {responsive as r} from "lib";

function SuccessBody(props) {
  return (
    <Flex
      transition="max-width 0.3s"
      maxWidth={r("100% -----> 60rem")}
      flexDirection="column"
    >
      <Flex flexDirection="column" flexGrow={0}>
        <Text>Congrats!</Text>
      </Flex>
    </Flex>
  );
}

function Success(props) {
  return (
    <Flex
      pl={r("2 3 -> 4 5")}
      pr={r("2 3 -> 4 5")}
      w={"100%"}
      h={"100%"}
      justifyContent="center"
      transition="padding 0.3s"
    >
      <SuccessBody {...props} />
    </Flex>
  );
}

export default Success;
