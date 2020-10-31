import {Flex, Button, Text} from "components";
import React from "react";
import styled from "styled-components";
import {responsive as r} from "lib";

const CheckoutButton = styled(Button)`
  outline: none;
  border: none;
`;

export default props => (
  <Flex
    pl={r("2 3 -> 4 5")}
    pr={r("2 3 -> 4 5")}
    transition="padding 0.3s"
    justifyContent="center"
    h={"fit-content"}
    {...props}
  >
    <CheckoutButton
      h={5}
      w={r("100% --> 60rem")}
      minWidth="26rem"
      maxWidth={r("100% -----> 60rem")}
      disabled={props.disabled}
      bg="navys.1"
      cursor={"pointer"}
      onClick={() => {
        let nextIndex = (props.currentIndex + 1) % props.maxLength;
        props.setCurrentIndex(nextIndex);
      }}
    >
      <Text color="whites.0" fs={3} ml="auto" mr="auto">
        {props.footer}
      </Text>
    </CheckoutButton>
  </Flex>
);
