import React from "react";
import {Text, Box, Svg, LogoIcon} from "components";
import {LeftColumn, RightColumn} from "./layout";
import {Flex} from "components";
import {
  Nav,
  MenuBar,
  MobileBrandsNav,
  BrandInventory,
  StoreDescription,
  Footer
} from "./Sections";
import {Checkout} from "./Components";
import {API_MEDIA} from "api";
import {BRANDS} from "views/Store/gql";
import {useQuery} from "@apollo/client";
import {responsive as r} from "lib";
import withdemodashStore from "./higherOrder";
import {connect} from "react-redux";
import {mapStateToProps} from "lib";

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

const _Store = props => {
  const {demodashStore, checkoutDrawerOpen} = props;
  const demodashStoreId = parseInt(demodashStore.id);
  let {data} = useQuery(BRANDS, {
    variables: {demodashStoreId: demodashStoreId}
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
        <RightColumn bg={checkoutDrawerOpen ? "whites.0" : "blues.3"}>
          <Checkout demodashStoreId={demodashStoreId} />
          {!checkoutDrawerOpen && (
            <>
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
            </>
          )}
        </RightColumn>
      </Flex>
    );
  }
  return <Box>Loading brands</Box>;
};

const Store = connect(
  state => mapStateToProps(state, ["checkoutDrawerOpen"]),
  null
)(_Store);

export default withdemodashStore(Store);
