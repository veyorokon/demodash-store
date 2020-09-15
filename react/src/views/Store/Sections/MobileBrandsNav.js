import React from "react";
import {Flex, Text, Svg, BorderButton} from "components";
import {responsive as r} from "lib";
import bromane from "assets/svg/test/bromane.svg";

const MobileBrandNav = props => {
  return (
    <Flex mt={3} mb={3} flexDirection="column" {...props}>
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
      <Flex pl={1} pr={1}>
        <BorderButton borderColor={"whites.3"} br={2} p={1}>
          <Flex alignItems="center">
            <Svg mr={2} w={4} h={4} src={bromane} />
            <Text letterSpacing={"0.45px"} mr={2} fw={500}>
              Bromane
            </Text>
          </Flex>
        </BorderButton>
      </Flex>
    </Flex>
  );
};
export default MobileBrandNav;
