import React, {useState} from "react";
import {Text, Box, Icon, LogoIcon} from "components";
import {LeftColumn, RightColumn} from "./layout";
import {Flex, Section} from "components";
import {
  Nav,
  Menu
  //Products, Header,
} from "./Sections";
import {Query} from "@apollo/react-components";
import {DEMODASH_STORE} from "views/Store/gql";
import Dots from "assets/svg/dots.js";

import styled, {css} from "styled-components";

import {responsive as r, getDemoerHandle} from "lib";

const BrandIcon = styled(Icon)`
  transition: transform 0.4s;
  ${props =>
    props.isActive &&
    css`
      transform: rotate(180deg);
    `}
`;

const Brand = props => {
  const [isActive, setActive] = useState(false);

  return (
    <Flex
      cursor="pointer"
      pt={2}
      pb={2}
      alignItems="center"
      flexGrow={0}
      mt={4}
      h="fit-content"
      w="fit-content"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <BrandIcon isActive={isActive} mr={3} h={3}>
        <Dots
          fill1={isActive ? "oranges.2" : "currentColor"}
          fill2={isActive ? "yellows.1" : "currentColor"}
          fill3={isActive ? "lightBlues.0" : "currentColor"}
        />
      </BrandIcon>
      <Text h="fit-content" color="navys.1" fs={"1.6rem"}>
        {props.children}
      </Text>
    </Flex>
  );
};

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
              <LeftColumn
                borderRight={"1px solid"}
                borderRightColor={"whites.3"}
                bg={"whites.0"}
                display={r("none -------> flex")}
              >
                <Flex
                  transition="padding 0.3s"
                  w={"100%"}
                  pl={r("4 ---------> 5")}
                  pr={3}
                  pt={4}
                  pb={4}
                  flexDirection="column"
                >
                  <LogoIcon />
                  <Text
                    letterSpacing="1px"
                    fw={"600"}
                    fs={"2.6rem"}
                    color="navys.0"
                    mt={5}
                  >
                    Brands
                  </Text>
                  <Brand>Bromane</Brand>
                </Flex>
              </LeftColumn>
              <RightColumn bg={"blues.3"}>
                <Menu
                  demodashStore={demodashStore}
                  display={r("flex -------> none")}
                />
                <Flex
                  transition="padding 0.3s"
                  flexDirection="column"
                  pl={r("1 3 --------> 4")}
                  pr={r("1 3 --------> 4")}
                  pt={r("3 -------> 4")}
                >
                  <Nav demodashStore={demodashStore} />
                  {/*<Header demodashStore={demodashStore} />
                  <Products demodashStoreId={demodashStore.id} />*/}
                </Flex>
              </RightColumn>
            </Flex>
          );
        }}
      </Query>
    </Section>
  );
};
