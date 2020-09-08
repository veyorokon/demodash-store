import React from "react";
import {Flex, Text, Svg, BorderButton} from "components";
import bromane from "assets/svg/test/bromane.svg";

const MobileBrandNav = props => {
  return (
    <Flex mt={3} mb={3} flexDirection="column" {...props}>
      <Text letterSpacing="0.83px" fw={600} fs={2} mb={2}>
        Brands:
      </Text>
      <Flex>
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
