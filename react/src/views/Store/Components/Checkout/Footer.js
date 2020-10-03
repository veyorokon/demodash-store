import {Flex, Button, Text} from "components";
import React from "react";
import styled from "styled-components";

const CheckoutButton = styled(Button)`
  outline: none;
  border: none;
`;

export default props => (
  <Flex p={3} justifyContent="center" flexBasis={"10vh"} h={"fit-content"}>
    <CheckoutButton
      h={5}
      w="70%"
      onClick={() => {
        let nextIndex = (props.currentIndex + 1) % props.numChildren;
        props.setCurrentIndex(nextIndex);
      }}
    >
      <Text fs={3} ml="auto" mr="auto">
        Continue
      </Text>
    </CheckoutButton>
  </Flex>
);
