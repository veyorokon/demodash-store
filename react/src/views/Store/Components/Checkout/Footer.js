import {Flex, Button, Text} from "components";
import React from "react";
import styled from "styled-components";
import {responsive as r} from "lib";

const CheckoutButton = styled(Button)`
  outline: none;
  border: none;
`;

export default props => (
  <Flex p={3} justifyContent="center" h={"fit-content"} {...props}>
    <CheckoutButton
      h={5}
      w={r("100% --> 60rem")}
      minWidth="26rem"
      maxWidth="60rem"
      bg="navys.1"
      onClick={() => {
        let nextIndex = (props.currentIndex + 1) % props.numChildren;
        props.setCurrentIndex(nextIndex);
      }}
    >
      <Text color="whites.0" fs={3} ml="auto" mr="auto">
        Continue
      </Text>
    </CheckoutButton>
  </Flex>
);
