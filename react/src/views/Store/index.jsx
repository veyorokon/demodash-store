import React from "react";
import {Text, Box, Svg, LogoIcon, Link} from "components";
import {LeftColumn, RightColumn} from "./layout";
import {Flex, Section} from "components";
import {
  Nav,
  MenuBar,
  MobileBrandsNav,
  BrandInventory,
  StoreDescription
} from "./Sections";
import {Checkout} from "./Components";
import {useQuery} from "@apollo/client";
import {DEMODASH_STORE, BRANDS} from "views/Store/gql";
import {responsive as r, getDemoerHandle} from "lib";
import {API_MEDIA} from "api";

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

const Brand = props => {
  const {brand} = props;
  return (
    <Flex
      w="fit-content"
      cursor="pointer"
      flexGrow={0}
      alignItems="center"
      {...props}
      p={1}
    >
      {brand.profile.logo && (
        <Svg mr={2} w={4} h={4} src={API_MEDIA + brand.profile.logo} />
      )}
      <Text p={1} h="fit-content" color="navys.1" fs={"1.8rem"}>
        {brand.profile.name}
      </Text>
    </Flex>
  );
};

const Footer = props => (
  <Flex
    mb={4}
    alignItems={"flex-end"}
    w={"fit-content"}
    ml={"auto"}
    mr={"auto"}
    flexGrow={0}
    {...props}
  >
    <Link target="_blank" mr={3} h="fit-content" href="https://demodash.com">
      <Text hoverColor={"#212C39"} fw={500} color="navys.2">
        &copy; demodash
      </Text>
    </Link>
    <Link
      target="_blank"
      mr={3}
      h="fit-content"
      href="https://demodash.com/legal/privacy"
    >
      <Text hoverColor={"#212C39"} fw={500} color="navys.2">
        Privacy
      </Text>
    </Link>
    <Link
      target="_blank"
      h="fit-content"
      href="https://demodash.com/legal/terms"
    >
      <Text hoverColor={"#212C39"} fw={500} color="navys.2">
        Terms
      </Text>
    </Link>
  </Flex>
);

const Store = props => {
  const {demodashStore} = props;
  let {data} = useQuery(BRANDS, {
    variables: {demodashStoreId: parseInt(demodashStore.id)}
  });
  if (data) {
    const {demodashStoreInventory} = data;
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
            {demodashStoreInventory.length ? (
              demodashStoreInventory.map((brandInventory, index) => (
                <Brand key={"dBrand_" + index} {...brandInventory} />
              ))
            ) : (
              <Text>No inventory</Text>
            )}
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
              borderBottomColor={"whites.3"}
              demodashStore={demodashStore}
            />
          )}
          <Checkout />
          <MobileBrandsNav
            demodashStoreInventory={demodashStoreInventory}
            display={r("flex -------> none")}
          />
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
          <Footer mt={5} />
        </RightColumn>
      </Flex>
    );
  }
  return <Box>Loading brands</Box>;
};

export default withdemodashStore(Store);
