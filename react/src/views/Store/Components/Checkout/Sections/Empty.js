import React from "react";
import {Flex, Text} from "components";
import EmptyCart from "assets/icons/EmptyCart";
import {responsive as r} from "lib";

function Success(props) {
  return (
    <Flex
      p={2}
      pt={4}
      pb={4}
      flexDirection="column"
      h={"100%"}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex p={3} flexGrow={0} flexDirection="column" alignItems="center">
        <Text textAlign="center" mt={2} fs={"2.4rem"} fw={600}>
          Your cart is empty
        </Text>
        <Text
          textAlign="center"
          color="navys.0"
          mt={2}
          fs={r("1.8rem ---> 2rem")}
        >
          Add something cool to your cart for checkout!
        </Text>
      </Flex>
      <Flex p={3} alignItems="center" h={"fit-content"}>
        <EmptyCart />
      </Flex>
    </Flex>
  );
}

export default Success;
