import React from "react";
import {Flex, Text} from "components";
import {responsive as r} from "lib";

const Header = props => {
  const {demodashStore} = props;
  return (
    <Flex>
      <Flex flexGrow={0} flexDirection="column">
        <Text
          h="fit-content"
          as="h2"
          fw={r("400")}
          fs={"1.4rem"}
          color="navys.0"
          mt={2}
        >
          {demodashStore.description}
        </Text>
      </Flex>
    </Flex>
  );
};
export default Header;
