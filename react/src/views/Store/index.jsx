import React, {useState} from "react";
import {Text, Box, Icon, LogoIcon} from "components";
import {LeftColumn, RightColumn} from "./layout";
import {Flex, Section} from "components";
import {
  Nav,
  MenuBar,
  MobileBrandsNav,
  BrandInventory,
  StoreDescription
} from "./Sections";
import {useQuery} from "@apollo/client";
import {DEMODASH_STORE, BRANDS} from "views/Store/gql";
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

const DemodashStore = props => {
  let {
    data
    // error: demodashStoreError,
    // loading: demodashStoreLoading
  } = useQuery(DEMODASH_STORE, {
    variables: {handle: getDemoerHandle()}
  });
  if (data) {
    const {demodashStore} = data;
    console.log(demodashStore);
    return (
      <Section height={"fit-content"} overflow="hidden">
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
              <LogoIcon showAllDots={false} />
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
            <MenuBar
              demodashStore={demodashStore}
              display={r("flex -------> none")}
            />
            <Nav
              transition="padding 0.3s, color 0.2s"
              pl={r("1 3 --------> 4")}
              pr={r("1 3 --------> 4")}
              pb={3}
              pt={r("3 -------> 4")}
              bg={r("whites.0  -------> unset")}
              borderBottom={"1px solid"}
              borderBottomColor={r("whites.3  -------> transparent")}
              demodashStore={demodashStore}
              cartButtonDisplay={r("none -------> flex")}
            />
            {demodashStore.description && (
              <StoreDescription
                transition="padding 0.3s"
                pl={r("1 3 --------> 4")}
                pr={r("1 3 --------> 4")}
                borderBottom={"1px solid"}
                borderBottomColor={r("whites.3 ")}
                demodashStore={demodashStore}
              />
            )}
            <MobileBrandsNav display={r("flex -------> none")} />
            <Flex
              transition="padding 0.3s"
              flexDirection="column"
              pl={r("1 3 --------> 4")}
              pr={r("1 3 --------> 4")}
              pt={r("3 -------> 4")}
              mb={5}
            >
              <BrandInventory demodashStoreId={demodashStore.id} />
            </Flex>
          </RightColumn>
        </Flex>
      </Section>
    );
  }
  return <Box>Test</Box>;
};

function withdemodashStore(WrappedComponent) {
  return () => {
    let {
      data
      // error: demodashStoreError,
      // loading: demodashStoreLoading
    } = useQuery(DEMODASH_STORE, {
      variables: {handle: getDemoerHandle()}
    });
    if (data) {
      const {demodashStore} = data;
      console.log(demodashStore);
      return (
        <Section height={"fit-content"} overflow="hidden">
          <WrappedComponent demodashStore={demodashStore} />
        </Section>
      );
    }
    return <Box>Test</Box>;
  };
}

const Store = props => {
  const {demodashStore} = props;
  return (
    <>
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
          <LogoIcon showAllDots={false} />
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
        <MenuBar
          demodashStore={demodashStore}
          display={r("flex -------> none")}
        />
        <Nav
          transition="padding 0.3s, color 0.2s"
          pl={r("1 3 --------> 4")}
          pr={r("1 3 --------> 4")}
          pb={3}
          pt={r("3 -------> 4")}
          bg={r("whites.0  -------> unset")}
          borderBottom={"1px solid"}
          borderBottomColor={r("whites.3  -------> transparent")}
          demodashStore={demodashStore}
          cartButtonDisplay={r("none -------> flex")}
        />
        {demodashStore.description && (
          <StoreDescription
            transition="padding 0.3s"
            pl={r("1 3 --------> 4")}
            pr={r("1 3 --------> 4")}
            borderBottom={"1px solid"}
            borderBottomColor={r("whites.3 ")}
            demodashStore={demodashStore}
          />
        )}
        <MobileBrandsNav display={r("flex -------> none")} />
        <Flex
          transition="padding 0.3s"
          flexDirection="column"
          pl={r("1 3 --------> 4")}
          pr={r("1 3 --------> 4")}
          pt={r("3 -------> 4")}
          mb={5}
        >
          <BrandInventory demodashStoreId={demodashStore.id} />
        </Flex>
      </RightColumn>
    </>
  );
};

export default withdemodashStore(Store);
