import React from "react";
import {Flex, Text} from "components";
import OrderConfirmed from "assets/icons/OrderConfirmed";
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
          Your payment was successful
        </Text>
        <Text
          textAlign="center"
          color="navys.0"
          mt={2}
          fs={r("1.8rem ---> 2rem")}
        >
          It'll be packaged and shipped to your door.
        </Text>
      </Flex>
      <Flex p={3} alignItems="center" h={"fit-content"}>
        <OrderConfirmed />
      </Flex>
      <Flex p={3} flexGrow={0} flexDirection="column" alignItems="center">
        <Text textAlign="center" color={"greys.0"} mt={2} fs={"1.6rem"}>
          Thank you for your payment. You'll receive an email with your receipt
          and tracking number.
        </Text>
      </Flex>
    </Flex>
  );
}

export default Success;
