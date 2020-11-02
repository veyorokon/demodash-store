import {Flex, Text, Icon} from "components";
import React from "react";
import {CloseCircle} from "@styled-icons/ionicons-outline/CloseCircle";
import {Trash} from "@styled-icons/octicons/Trash";
import {connect} from "react-redux";
import {
  setCheckoutIndex,
  toggleCheckoutDrawer,
  setCheckoutSuccessful,
  clearCart
} from "redux/actions";
import {responsive as r} from "lib";

function _Header(props) {
  const {
    toggleCheckoutDrawer,
    setCheckoutIndex,
    setCheckoutSuccessful,
    wasSuccessful,
    clearCart,
    isEmpty
  } = props;
  return (
    <Flex
      position="relative"
      alignItems="center"
      p={3}
      justifyContent="center"
      h={"fit-content"}
      {...props}
    >
      <Icon
        position="absolute"
        left={"5%"}
        cursor="pointer"
        onClick={() => {
          setCheckoutIndex({checkoutIndex: 0});
          if (wasSuccessful) {
            setCheckoutSuccessful({
              checkoutSuccessful: false
            });
            clearCart();
          }
          toggleCheckoutDrawer();
        }}
        h={"3.6rem"}
        w={"3.6rem"}
      >
        <CloseCircle />
      </Icon>
      <Text fs={r("2 -> 3")} ml="auto" mr="auto">
        {props.header}
      </Text>
      {!isEmpty && (
        <Icon
          position="absolute"
          right={"5%"}
          cursor="pointer"
          color="oranges.1"
          onClick={() => {
            const conf = window.confirm("Empty your cart?");
            if (conf) clearCart();
          }}
          h={"3rem"}
          w={"3rem"}
        >
          <Trash />
        </Icon>
      )}
    </Flex>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    toggleCheckoutDrawer: () => dispatch(toggleCheckoutDrawer()),
    setCheckoutSuccessful: payload => dispatch(setCheckoutSuccessful(payload)),
    setCheckoutIndex: payload => dispatch(setCheckoutIndex(payload)),
    clearCart: () => dispatch(clearCart())
  };
}

export default connect(
  null,
  mapDispatchToProps
)(_Header);
