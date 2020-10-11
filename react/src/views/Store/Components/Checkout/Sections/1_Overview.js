import React from "react";
import {Flex, Text, Span} from "components";
import {CheckoutCard} from "views/Store/Components";
import {connect} from "react-redux";
import {mapStateToProps, isEmpty, responsive as r} from "lib";

function getCartItems(cart) {
  let cartItems = [];
  Object.keys(cart).forEach(function(brandId) {
    Object.keys(cart[brandId]).forEach(function(checkoutToken) {
      console.log(checkoutToken, cart[brandId][checkoutToken]);
      cartItems.push({...cart[brandId][checkoutToken]});
    });
  });
  return cartItems;
}

function _Overview(props) {
  const {cart} = props;
  let cartItems = [];
  if (!isEmpty(cart)) cartItems = getCartItems(cart);
  return (
    <Flex
      pl={r("2 ---> 4")}
      pr={r("2 ---> 4")}
      w={"100%"}
      h={"100%"}
      justifyContent="center"
      transition="padding 0.3s"
    >
      <Flex
        transition="max-width 0.3s"
        maxWidth={r("100% -----> 60rem")}
        flexDirection="column"
      >
        {cartItems &&
          cartItems.map((item, index) => (
            <>
              <CheckoutCard key={index} {...item} />
              <Span mt={2} borderBottom="1px solid #e3e3ee" w="100%" />
            </>
          ))}
        <Text>Total: </Text>
      </Flex>
    </Flex>
  );
}

const Overview = connect(
  state => mapStateToProps(state, ["cart"]),
  null
)(_Overview);

export default Overview;
