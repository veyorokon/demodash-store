import React from "react";
import {Flex, LogoIcon, Icon} from "components";
import {CartButton} from "views/Store/Components";
import {MenuOutline} from "@styled-icons/evaicons-outline/MenuOutline";
import {responsive as r} from "lib";

const MenuBar = props => {
  return (
    <Flex
      bg={"whites.0"}
      justifyContent="space-between"
      alignItems="center"
      p={2}
      pb={1}
      h={5}
      {...props}
    >
      <Icon cursor="pointer" justifyContent="center" mr={1} h={"3rem"}>
        <MenuOutline />
      </Icon>
      <LogoIcon
        iconProps={{w: r("0 --> 3rem"), transition: "width 0.2s"}}
        smallDotProps={{opacity: r("0.4 --> 0")}}
        mr={2}
      />
      <CartButton count={33} />
    </Flex>
  );
};
export default MenuBar;
