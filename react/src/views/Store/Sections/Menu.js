import React from "react";
import {Flex, LogoIcon} from "components";

const Nav = props => {
  return (
    <Flex
      bg={"whites.0"}
      borderBottom={"1px solid"}
      borderBottomColor={"whites.3"}
      justifyContent="space-between"
      alignItems="center"
      p={2}
      h={5}
      {...props}
    >
      <LogoIcon />
    </Flex>
  );
};
export default Nav;
