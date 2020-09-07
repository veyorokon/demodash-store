import React, {useState} from "react";
import {Flex, Icon, Text, BorderButton} from "components";
import {Cart} from "@styled-icons/boxicons-regular/Cart";
import {responsive as r} from "lib";

export default props => {
  const [isHover, setHover] = useState(false);
  return (
    <BorderButton
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      br={2}
      borderColor={
        isHover ? r("transparent --> navys.3") : r("transparent --> whites.3")
      }
      {...props}
    >
      <Flex p={r("0 --> 1")} alignItems="center" flexGrow={0}>
        <Icon color={isHover ? "navys.0" : "navys.1"} h={r("3rem --> 4")}>
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
          {props.count}
        </Text>
      </Flex>
    </BorderButton>
  );
};