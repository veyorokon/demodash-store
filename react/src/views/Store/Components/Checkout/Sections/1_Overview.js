import React from "react";
import {Flex, Text} from "components";
import {CheckoutCard} from "views/Store/Components";
import {connect} from "react-redux";
import {mapStateToProps, isEmpty} from "lib";

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
    <Flex flexDirection="column">
      {cartItems &&
        cartItems.map((item, index) => <CheckoutCard key={index} {...item} />)}
      <Text>test 1</Text>
    </Flex>
  );
}

const Overview = connect(
  state => mapStateToProps(state, ["cart"]),
  null
)(_Overview);

export default Overview;
