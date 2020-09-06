import React from "react";
import {Flex, Text, Svg, BorderButton} from "components";
import bromane from "assets/svg/test/bromane.svg";
import {responsive as r} from "lib";

const HoverButton = props => {
  return (
    <BorderButton br={2} borderColor={r("whites.3")} {...props}>
      {props.children}
    </BorderButton>
  );
};

const MobileBrandNav = props => {
  return (
    <Flex flexDirection="column" {...props}>
      <Text fw={600} fs={2} mb={2}>
        Brands:
      </Text>
      <Flex>
        <HoverButton br={2} p={2}>
          <Flex alignItems="center">
            <Svg mr={2} w={4} h={4} src={bromane} />
            <Text fw={500}>Bromane</Text>
          </Flex>
        </HoverButton>
      </Flex>
    </Flex>
  );
};
export default MobileBrandNav;
