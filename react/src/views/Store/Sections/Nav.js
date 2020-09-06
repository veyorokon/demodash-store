import React, {useState} from "react";
import {Flex, Button, Text, Icon} from "components";
import {Cart} from "@styled-icons/boxicons-regular/Cart";
// import {responsive as r} from "lib";
import styled from "styled-components";

const BorderButton = styled(Button)`
  border-width: 2px;
  border-style: solid;
  background: transparent;
  cursor: pointer;
`;

const FlexText = styled(Text)`
  flex-grow: 1;
`;

const CartButton = props => {
  const [isHover, setHover] = useState(false);
  return (
    <BorderButton
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      br={2}
      borderColor={isHover ? "navys.3" : "whites.3"}
    >
      <Flex p={1} alignItems="center" flexGrow={0}>
        <Icon color={isHover ? "navys.0" : "navys.1"} h={4}>
          <Cart />
        </Icon>
        <Text color={isHover ? "navys.0" : "navys.1"} fw={600} fs={2} ml={2}>
          Cart:
        </Text>
        <Text
          color={isHover ? "navys.0" : "navys.1"}
          fw={600}
          fs={2}
          ml={1}
          mr={1}
        >
          3
        </Text>
      </Flex>
    </BorderButton>
  );
};

const Nav = props => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      minHeight={[
        "fit-content",
        "fit-content",
        "fit-content",
        "fit-content",
        4
      ]}
      flexWrap={["wrap", "wrap", "wrap", "wrap", "unset"]}
    >
      <FlexText
        mt={2}
        mb={2}
        minWidth={"29rem"}
        h="fit-content"
        as="h1"
        fs={3}
        fw={"600"}
        color="navys.0"
      >
        {props.demodashStore.name}
      </FlexText>
      <CartButton />
    </Flex>
  );
};
export default Nav;
