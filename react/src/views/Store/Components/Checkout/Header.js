import {Flex, Text, Icon} from "components";
import React from "react";
import {CloseCircle} from "@styled-icons/ionicons-outline/CloseCircle";
import {connect} from "react-redux";
import {
  setCheckoutIndex,
  toggleCheckoutDrawer,
  setCheckoutSuccessful,
  clearCart
} from "redux/actions";

function _Header(props) {
  const {
    toggleCheckoutDrawer,
    setCheckoutIndex,
    setCheckoutSuccessful,
    wasSuccessful,
    clearCart
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
      <Text fs={3} ml="auto" mr="auto">
        {props.header}
      </Text>
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
