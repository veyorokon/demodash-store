import React from "react";
import {Text, Box, Svg, LogoIcon} from "components";
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
import {responsive as r, getDemoerHandle} from "lib";
import bromane from "assets/svg/test/bromane.svg";

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
      return (
        <Section height={"fit-content"} overflow="hidden">
          <WrappedComponent demodashStore={demodashStore} />
        </Section>
      );
    }
    return <Box>Test</Box>;
  };
}

const Brand = props => (
  <Flex flexGrow={0} alignItems="center">
    <Svg mr={2} w={4} h={4} src={bromane} />
    <Text>{props.children}</Text>
  </Flex>
);

const Store = props => {
  const {demodashStore} = props;
  let {data} = useQuery(BRANDS, {
    variables: {demodashStoreId: parseInt(demodashStore.id)}
  });
  if (data) {
    const {demodashStoreInventory} = data;
    console.log(demodashStoreInventory);
    return (
      <Flex>
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
              mb={5}
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
    );
  }
  return <Box>Loading brands</Box>;
};

export default withdemodashStore(Store);
