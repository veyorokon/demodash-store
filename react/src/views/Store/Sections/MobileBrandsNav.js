import React from "react";
import {Flex, Text, Svg, BorderButton} from "components";
import {responsive as r} from "lib";
import {API_MEDIA} from "api";

const Brand = props => {
  const {brand} = props;
  return (
    <Flex flexGrow={0} alignItems="center" {...props}>
      {brand.profile.logo && (
        <Svg mr={2} w={4} h={4} src={API_MEDIA + brand.profile.logo} />
      )}
      <Text letterSpacing={"0.45px"} mr={2} fw={500}>
        {brand.profile.name}
      </Text>
    </Flex>
  );
};
const MobileBrandNav = props => {
  const {demodashStoreInventory} = props;
  return (
    <Flex mt={4} mb={3} flexDirection="column" {...props}>
      <Text
        transition="padding 0.3s"
        pl={r("1 3 --------> 4")}
        pr={r("1 3 --------> 4")}
        letterSpacing="0.83px"
        fw={600}
        fs={2}
        mb={2}
      >
        Brands:
      </Text>
      <Flex
        display={demodashStoreInventory.length ? "flex" : "none"}
        overflow="hidden"
        pl={1}
        pr={1}
      >
        <Flex w="fit-content" overflowX={"scroll"}>
          {demodashStoreInventory.length &&
            demodashStoreInventory.map((brandInventory, index) => (
              <BorderButton
                key={"mBrand_" + index}
                borderColor={"whites.3"}
                br={2}
                p={1}
                mr={3}
              >
                <Brand {...brandInventory} />
              </BorderButton>
            ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default MobileBrandNav;
