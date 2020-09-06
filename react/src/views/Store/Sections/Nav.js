import React from "react";
import {Flex, Text} from "components";
import {CartButton} from "views/Store/Components";

const Nav = props => {
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
          fs={3}
          fw={"600"}
          color="navys.0"
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
      <CartButton display={props.cartButtonDisplay} count={2} />
    </Flex>
  );
};
export default Nav;
