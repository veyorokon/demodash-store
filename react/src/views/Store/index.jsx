import React from "react";
import {Text, Box, Icon} from "components";
import {LeftColumn, RightColumn} from "./layout";
import {Flex, Section} from "components";
import {Products, Header} from "./Sections";
import {Query} from "@apollo/react-components";
import {DEMODASH_STORE} from "views/Store/gql";
import LogoIcon from "assets/svg/logo.js";

import styled from "styled-components";

import {responsive as r, getDemoerHandle} from "lib";

const Logo = styled(Text)`
  text-align: center;
  font-weight: 600;
  letter-spacing: -0.8px;
`;

const LogoTitle = props => (
  <Flex flexGrow={0} alignItems="center" mr={3} {...props}>
    <Icon justifyContent="center" mr={3} h={"3rem"}>
      <LogoIcon />
    </Icon>
    <Logo as="h1" fs={r("2.6rem")} color="navys.0">
      demodash
    </Logo>
  </Flex>
);

export default () => {
  return (
    <Section height={"fit-content"} overflow="hidden">
      <Query
        query={DEMODASH_STORE}
        variables={{
          handle: getDemoerHandle()
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
                <Text>HERE</Text>
                <Text>Error! {error.message}</Text>
              </Box>
            );
          const {demodashStore} = data;
          console.log(demodashStore);
          return (
            <Flex h={"100vh"}>
              <LeftColumn bg={"whites.0"} display={r("none -------> flex")}>
                <Flex
                  w={"100%"}
                  pl={1}
                  pr={1}
                  pt={4}
                  pb={4}
                  flexDirection="column"
                >
                  <LogoTitle />
                  <Text color="navys.1" mt={4}>
                    Brands in inventory
                  </Text>
                  <Text color="navys.1" fs={"1.6rem"} mt={4}>
                    Bromane
                  </Text>
                </Flex>
              </LeftColumn>
              <RightColumn bg={"whites.0"}>
                <Header demodashStore={demodashStore} />
                <Products demodashStoreId={demodashStore.id} />
              </RightColumn>
            </Flex>
          );
        }}
      </Query>
    </Section>
  );
};
