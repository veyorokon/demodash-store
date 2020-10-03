import React, {useState} from "react";
import {Flex, Icon, Text, BorderButton} from "components";
import {Cart} from "@styled-icons/boxicons-regular/Cart";
import {responsive as r} from "lib";
import {connect} from "react-redux";
import {toggleCheckoutDrawer} from "redux/actions";
import {mapStateToProps} from "lib";

function calculateCartTotal(cart) {
  let amount = 0;
  for (const [, checkoutItem] of Object.entries(cart)) {
    for (const [, item] of Object.entries(checkoutItem)) {
      amount += item.amount;
    }
  }
  return amount;
}

function _CartButton(props) {
  const [isHover, setHover] = useState(false);
  const total = calculateCartTotal(props.cart);
  const {toggleCheckoutDrawer} = props;
  return (
    <BorderButton
      onClick={() => toggleCheckoutDrawer()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      br={2}
      borderColor={
        isHover ? r("transparent --> navys.3") : r("transparent --> whites.3")
      }
      {...props}
    >
      <Flex p={r("0 --> 1")} alignItems="center" flexGrow={0}>
        <Icon color={isHover ? "navys.0" : "navys.1"} h={r("3rem --> 4")}>
          <Cart />
        </Icon>
        <Text color={isHover ? "navys.0" : "navys.1"} fw={600} fs={2} ml={2}>
          Cart:
        </Text>
        <Text
          color={isHover ? "navys.0" : "navys.1"}
          fw={600}
          fs={2}
          ml={1}
          mr={1}
        >
          {total}
        </Text>
      </Flex>
    </BorderButton>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    toggleCheckoutDrawer: () => dispatch(toggleCheckoutDrawer())
  };
}

export default connect(
  state => mapStateToProps(state, ["cart"]),
  mapDispatchToProps
)(_CartButton);
