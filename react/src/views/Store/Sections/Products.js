import React from "react";
import {Flex, Box, Text} from "components";
import {responsive as r} from "lib";

const Products = props => {
  return (
    <Box
      ml={r("2 ---> 3 -> 4 5 6 -> 7")}
      mr={r("2 ---> 3 -> 4 5 6 -> 7")}
      pt={r("4")}
      pb={r("4")}
    >
      <Flex
        justifyContent="flex-start"
        flexDirection="column"
        alignItems="center"
      >
        <Text
          textAlign="center"
          lineHeight={"1.5"}
          as="h2"
          fw={r("600")}
          fs={r("2.8rem --> 3rem ---> 3.4rem")}
          color="navys.0"
          mb={2}
          letterSpacing={"-.8px"}
        >
          Cherry's Barbershop
        </Text>
      </Flex>
    </Box>
  );
};
export default Products;
