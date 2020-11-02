import {Flex, Icon} from "components";
import React from "react";
import {ArrowIosForwardOutline} from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";
import {Cart} from "@styled-icons/ionicons-outline/Cart";
import {Truck} from "@styled-icons/bootstrap/Truck";
import {CreditCard2Front as Card} from "@styled-icons/bootstrap/CreditCard2Front";
import {ClipboardCheck as Clipboard} from "@styled-icons/bootstrap/ClipboardCheck";
import {responsive as r, mapStateToProps} from "lib";
import {connect} from "react-redux";
import {setCheckoutIndex} from "redux/actions";

const Spacer = () => (
  <Icon color={"greys.0"} h={3} ml={r("2 3 -> 4")} mr={r("2 3 -> 4")}>
    <ArrowIosForwardOutline />
  </Icon>
);

function _Nav(props) {
  const {setCheckoutIndex, checkoutMaxIndex, checkoutIndex} = props;
  return (
    <Flex
      alignItems="center"
      p={2}
      justifyContent="center"
      h={"fit-content"}
      flexGrow={0}
      {...props}
    >
      <Icon
        cursor="pointer"
        color={checkoutIndex === 0 ? "navys.0" : "navys.3"}
        onClick={() => {
          if (0 <= checkoutMaxIndex) setCheckoutIndex({checkoutIndex: 0});
        }}
        h={4}
      >
        <Cart />
      </Icon>
      <Spacer />
      <Icon
        cursor="pointer"
        color={checkoutIndex === 1 ? "navys.0" : "navys.3"}
        onClick={() => {
          if (1 <= checkoutMaxIndex) setCheckoutIndex({checkoutIndex: 1});
        }}
        h={4}
      >
        <Truck />
      </Icon>
      <Spacer />
      <Icon
        cursor="pointer"
        color={checkoutIndex === 2 ? "navys.0" : "navys.3"}
        onClick={() => {
          if (2 <= checkoutMaxIndex) setCheckoutIndex({checkoutIndex: 2});
        }}
        h={4}
      >
        <Card />
      </Icon>
      <Spacer />
      <Icon
        cursor="pointer"
        color={checkoutIndex === 3 ? "navys.0" : "navys.3"}
        onClick={() => {
          if (3 <= checkoutMaxIndex) setCheckoutIndex({checkoutIndex: 3});
        }}
        h={"2.6rem"}
      >
        <Clipboard />
      </Icon>
    </Flex>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setCheckoutIndex: payload => dispatch(setCheckoutIndex(payload))
  };
}

const Nav = connect(
  state => mapStateToProps(state, ["checkoutIndex"]),
  mapDispatchToProps
)(_Nav);

export default Nav;
