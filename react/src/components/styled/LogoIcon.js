import React from "react";
import LogoIcon from "assets/svg/logo.js";
import {Flex, Box, Icon} from "components/core";
import styled from "styled-components";

import {responsive as r} from "lib";

const Dot = styled(Box)`
  position: absolute;
  transform: translate(-50%, 25%);
  border-radius: 50%;
  opacity: 0.4;
`;
const Logo = styled(Text)`
  text-align: center;
  font-weight: 600;
  position: relative;
  letter-spacing: -0.8px;
`;

export default props => (
  <Flex h={4} w="fit-content" flexGrow={0} alignItems="center" {...props}>
    <Icon justifyContent="center" mr={3} h={"3rem"} {...props.iconProps}>
      <LogoIcon />
    </Icon>
    <Box position="relative">
      {/*
        <Dot top="85%" h="1rem" w="1rem" bg={"oranges.0"} />
        <Dot right="-10%" top="-25%" h="1rem" w="1rem" bg={"yellows.0"} />
    */}
      <Dot left="50%" top="-57%" h="4rem" w="4rem" bg={"lightBlues.0"} />
      <Logo as="h2" fs={r("2.2rem")} color="navys.0">
        demodash
      </Logo>
    </Box>
  </Flex>
);
