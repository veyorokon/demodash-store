import {Flex, Icon} from "components";
import React from "react";
import {ArrowIosForwardOutline} from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";
import {Cart} from "@styled-icons/ionicons-outline/Cart";
import {Truck} from "@styled-icons/bootstrap/Truck";
import {CreditCard2Front as Card} from "@styled-icons/bootstrap/CreditCard2Front";
import {ClipboardCheck as Clipboard} from "@styled-icons/bootstrap/ClipboardCheck";
import {responsive as r} from "lib";

const Spacer = () => (
  <Icon color={"greys.0"} h={3} ml={r("2 3 -> 4")} mr={r("2 3 -> 4")}>
    <ArrowIosForwardOutline />
  </Icon>
);

export default props => {
  const {currentIndex} = props;
  return (
    <Flex
      alignItems="center"
      p={2}
      justifyContent="center"
      h={"fit-content"}
      {...props}
    >
      <Icon
        color={currentIndex === 0 ? "navys.0" : "navys.3"}
        onClick={() => console.log("here")}
        h={4}
      >
        <Cart />
      </Icon>
      <Spacer />
      <Icon
        color={currentIndex === 1 ? "navys.0" : "navys.3"}
        onClick={() => console.log("here")}
        h={4}
      >
        <Truck />
      </Icon>
      <Spacer />
      <Icon
        color={currentIndex === 2 ? "navys.0" : "navys.3"}
        onClick={() => console.log("here")}
        h={4}
      >
        <Card />
      </Icon>
      <Spacer />
      <Icon
        color={currentIndex === 3 ? "navys.0" : "navys.3"}
        onClick={() => console.log("here")}
        h={"2.6rem"}
      >
        <Clipboard />
      </Icon>
    </Flex>
  );
};
