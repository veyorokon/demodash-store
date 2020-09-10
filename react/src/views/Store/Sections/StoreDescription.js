import React from "react";
import {Flex, Text} from "components";

const Nav = props => {
  const {demodashStore} = props;
  return (
    <Flex bg="greys.1" h={4} alignItems="center" {...props}>
      <Text h="fit-content" as="h2" fw={"400"} fs={"1.4rem"} color="navys.1">
        {demodashStore.description}
      </Text>
    </Flex>
  );
};
export default Nav;
