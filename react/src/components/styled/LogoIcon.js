import React from "react";
import LogoIcon from "assets/svg/logo.js";
import {Flex, Box, Icon, Text} from "components/core";
import styled from "styled-components";

import {responsive as r} from "lib";

const Dot = styled(Box)`
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  opacity: 0.4;
  transition: opacity 0.6s;
`;
const Logo = styled(Text)`
  text-align: center;
  font-weight: 600;
  position: relative;
  letter-spacing: -0.8px;
`;

const LocoIcon = props => (
  <Flex
    mt={2}
    mb={2}
    h={4}
    w="fit-content"
    flexGrow={0}
    alignItems="center"
    {...props}
  >
    {props.showIcon && (
      <Icon justifyContent="center" mr={2} h={"3rem"} {...props.iconProps}>
        <LogoIcon />
      </Icon>
    )}
    <Flex flexGrow={0} position="relative" alignItems="center" h="4rem">
      {props.showAllDots && (
        <>
          <Dot
            top="100%"
            h="1rem"
            w="1rem"
            bg={"oranges.0"}
            {...props.smallDotProps}
          />
          <Dot
            right="-10%"
            top="0"
            h="1rem"
            w="1rem"
            bg={"yellows.0"}
            {...props.smallDotProps}
          />
        </>
      )}
      <Dot left="50%" top="50%" h="4rem" w="4rem" bg={"lightBlues.0"} />
      <Logo as="h2" fontSize={r("2.4rem ---> 2.6rem")} color="navys.0">
        demodash
      </Logo>
    </Flex>
  </Flex>
);

LocoIcon.defaultProps = {
  showIcon: true,
  showAllDots: true
};
export default LocoIcon;
