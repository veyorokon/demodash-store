import React from "react";
import {Text, Box} from "components";
import {LeftColumn, RightColumn} from "./layout";
import {Flex, Section} from "components";
import {Products} from "./Sections";
import {Query} from "@apollo/react-components";
import {DEMODASH_STORE} from "views/Store/gql";

import {responsive as r} from "lib";

export default () => {
  return (
    <Section height={"fit-content"} overflow="hidden">
      <Query
        query={DEMODASH_STORE}
        variables={{
          handle: "30-4a5c6b4"
        }}
        // pollInterval={1000}
      >
        {({loading, error, data}) => {
          if (loading)
            return (
              <Box h="3.5rem" mb={4}>
                <Text>Loading...</Text>
              </Box>
            );
          if (error)
            return (
              <Box h="3.5rem" mb={4}>
                <Text>Error! {error.message}</Text>
              </Box>
            );
          console.log(data.demodashStore);
          return (
            <Flex h={"100vh"}>
              <LeftColumn bg={"whites.0"} display={r("none -------> flex")}>
                <Flex w={"100%"} pt={5} pb={5} flexDirection="column">
                  Brands
                </Flex>
              </LeftColumn>
              <RightColumn bg={"navys.4"}>
                <Products />
              </RightColumn>
            </Flex>
          );
        }}
      </Query>
    </Section>
  );
};
