import React from "react";
import {Flex, Text, Span} from "components";
import {CheckoutCard} from "views/Store/Components";
import {connect} from "react-redux";
import {mapStateToProps, isEmpty, responsive as r} from "lib";

function getCartTotal(cartItems = []) {
  if (!cartItems.length) return 0;
  let total = 0;
  for (var index in cartItems) {
    const item = cartItems[index];
    total += (item.product.price + item.product.shippingPrice) * item.amount;
  }
  return total;
}

function getCartItems(cart) {
  let cartItems = [];
  Object.keys(cart).forEach(function(brandId) {
    Object.keys(cart[brandId]).forEach(function(checkoutToken) {
      let demoCommissionId = checkoutToken.split("-")[1]; //Hacky
      cartItems.push({
        brandId,
        demoCommissionId,
        checkoutToken,
        ...cart[brandId][checkoutToken]
      });
    });
  });
  return cartItems;
}

function _Overview(props) {
  const {cart} = props;
  let cartItems = [];
  let cartTotal = 0;
  if (!isEmpty(cart)) {
    cartItems = getCartItems(cart);
    cartTotal = getCartTotal(cartItems);
    console.log(cartItems);
  }
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
        <Span mt={2} borderBottom="1px solid #e3e3ee" w="100%" />
        {cartItems &&
          cartItems.map((item, index) => (
            <Flex flexGrow={0} key={index} flexDirection="column">
              <CheckoutCard {...item} />
              <Span mt={2} borderBottom="1px solid #e3e3ee" w="100%" />
            </Flex>
          ))}

        <Flex flexGrow={0} flexDirection="column">
          <Flex justifyContent="space-between" mb={3} mt={3}>
            <Text fs={"1.6rem"} fw={500}>
              Total:
            </Text>
            <Text fs={"1.6rem"} fw={500}>
              ${cartTotal.toFixed(2)}
            </Text>
          </Flex>
          <Span borderBottom="1px solid #e3e3ee" w="100%" />
        </Flex>
      </Flex>
    </Flex>
  );
}

const Overview = connect(
  state => mapStateToProps(state, ["cart"]),
  null
)(_Overview);

export default Overview;
