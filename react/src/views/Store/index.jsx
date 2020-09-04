import React from "react";
import {Text, Box, Icon} from "components";
import {LeftColumn, RightColumn} from "./layout";
import {Flex, Section} from "components";
import {Products, Header} from "./Sections";
import {Query} from "@apollo/react-components";
import {DEMODASH_STORE} from "views/Store/gql";
import LogoIcon from "assets/svg/logo.js";
import Dots from "assets/svg/dots.js";

import styled from "styled-components";

import {responsive as r, getDemoerHandle} from "lib";

const Logo = styled(Text)`
  text-align: center;
  font-weight: 600;
  position: relative;
  letter-spacing: -0.8px;
`;

const Dot = styled(Box)`
  position: absolute;
  /* top: -57%; */
  /* left: 50%; */
  transform: translate(-50%, 25%);
  border-radius: 50%;
  opacity: 0.4;
`;

const LogoTitle = props => (
  <Flex h={4} w="fit-content" flexGrow={0} alignItems="center" {...props}>
    <Icon justifyContent="center" mr={3} h={"3rem"}>
      <LogoIcon />
    </Icon>
    <Box position="relative">
      <Dot top="85%" h="1rem" w="1rem" bg={"oranges.0"} />
      <Dot left="50%" top="-57%" h="4rem" w="4rem" bg={"lightBlues.0"} />
      <Dot right="-10%" top="-25%" h="1rem" w="1rem" bg={"yellows.0"} />
      <Logo as="h2" fs={r("2.2rem")} color="navys.0">
        demodash
      </Logo>
    </Box>
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
                  transition="padding 0.34s"
                  w={"100%"}
                  pl={r("4 --------> 5")}
                  pr={3}
                  pt={4}
                  pb={4}
                  flexDirection="column"
                >
                  <LogoTitle />
                  <Text fw={"600"} fs={"2.6rem"} color="navys.0" mt={5}>
                    Brands
                  </Text>
                  <Flex
                    pt={2}
                    pb={2}
                    alignItems="center"
                    flexGrow={0}
                    mt={4}
                    h="fit-content"
                  >
                    <Icon mr={3} h={3}>
                      <Dots />
                    </Icon>
                    <Text h="fit-content" color="navys.1" fs={"1.6rem"}>
                      Bromane
                    </Text>
                  </Flex>
                </Flex>
              </LeftColumn>
              <RightColumn
                transition="padding 0.34s"
                pl={r("3 --------> 4")}
                bg={"whites.0"}
              >
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
