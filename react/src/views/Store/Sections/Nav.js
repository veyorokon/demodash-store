import React from "react";
import {Flex, Text} from "components";
import {CartButton} from "views/Store/Components";

function Nav(props) {
  const {demodashStore} = props;
  const {address} = demodashStore.account.profile;
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
      {...props}
    >
      <Flex flexGrow={0} flexDirection="column">
        <Text
          maxWidth={"100%"}
          h="fit-content"
          as="h1"
          fs={4}
          fw={"600"}
          color="navys.0"
          letterSpacing={"0.3px"}
          mb={1}
        >
          {demodashStore.name}
        </Text>
        <Text
          mt={1}
          h="fit-content"
          as="h2"
          fw={"400"}
          fs={"1.4rem"}
          color="navys.1"
        >
          {address.city} {address.state}, {address.zip}
        </Text>
      </Flex>
      <CartButton display={props.cartButtonDisplay} />
    </Flex>
  );
}

export default Nav;
