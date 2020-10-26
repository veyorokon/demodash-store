import React from "react";
import {Flex, Text, Span} from "components";
import {connect} from "react-redux";
import {mapStateToProps, responsive as r} from "lib";

// function FlexRow(props) {
//   return (
//     <Flex
//       flexGrow={0}
//       flexDirection={r("column --> row")}
//       justifyContent="space-between"
//       {...props}
//     >
//       {props.children}
//     </Flex>
//   );
// }

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

function LineItem(props) {
  return (
    <Flex w={"100%"} justifyContent="space-between" {...props}>
      <Flex flexGrow={0}>
        <Text>{props.name}</Text>
        <Text ml={1}>&#10005; {props.amount}</Text>
      </Flex>
      <Flex flexGrow={0}>
        <Text>${(props.price * props.amount).toFixed(2)}</Text>
      </Flex>
    </Flex>
  );
}

function getCartShipping(cartItems = []) {
  let shippingTotal = 0;
  for (var i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const product = item.product;
    shippingTotal += product.shippingPrice * item.amount;
  }
  return shippingTotal;
}

function getCartTotal(cartItems = []) {
  if (!cartItems.length) return 0;
  let total = 0;
  for (var index in cartItems) {
    const item = cartItems[index];
    total += (item.product.price + item.product.shippingPrice) * item.amount;
  }
  return total;
}

function _Form(props) {
  const {cart, billingForm, shippingForm} = props;
  const cartItems = getCartItems(cart);
  console.log(cartItems);
  const shippingPrice = getCartShipping(cartItems);
  const cartTotal = getCartTotal(cartItems);
  return (
    <Flex
      transition="max-width 0.3s"
      maxWidth={r("100% -----> 60rem")}
      flexDirection="column"
    >
      <Span mt={2} borderBottom="1px solid #e3e3ee" w="100%" />
      <Flex flexDirection="column" flexGrow={0}>
        <Flex mt={3} flexGrow={0}>
          <Text transition="margin-right 0.2s" fw={500} mr={r("4 --> 5")}>
            Order:
          </Text>
          <Flex flexDirection="column" alignItems="flex-end">
            {cartItems &&
              cartItems.map((item, index) => (
                <LineItem
                  mb={2}
                  key={index}
                  amount={item.amount}
                  {...item.product}
                />
              ))}
          </Flex>
        </Flex>

        <Span mt={2} borderBottom="1px solid #e3e3ee" w="100%" />
        <Flex mb={2} mt={3} flexGrow={0}>
          <Text fw={500} mr={4}>
            Ship to:
          </Text>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text mb={1} fw={500}>
              {shippingForm.name}
            </Text>
            <Text mb={1}>{shippingForm.addressLine1}</Text>
            {shippingForm.addressLine2 && (
              <Text mb={1}>{shippingForm.addressLine2}</Text>
            )}
            <Text mb={1} display="inline">
              {shippingForm.city}
            </Text>
            <Flex>
              <Text mr={1} mb={1} display="inline">
                {shippingForm.state},
              </Text>
              <Text display="inline">{shippingForm.zip}</Text>
            </Flex>
          </Flex>
        </Flex>

        <Span mt={2} borderBottom="1px solid #e3e3ee" w="100%" />
        <Flex mb={2} mt={3} flexGrow={0}>
          <Text fw={500} mr={4}>
            Card ending:
          </Text>
          <Flex justifyContent="flex-end">
            <Text>
              *{billingForm.cardNumber.slice(billingForm.cardNumber.length - 4)}
            </Text>
          </Flex>
        </Flex>

        <Span mt={2} borderBottom="1px solid #e3e3ee" w="100%" />
        <Flex mb={2} mt={3} flexGrow={0}>
          <Text fw={500} mr={4}>
            Shipping:
          </Text>
          <Flex justifyContent="flex-end">
            {shippingPrice !== 0 && <Text display="inline">$</Text>}
            <Text display="inline">
              {shippingPrice ? shippingPrice.toFixed(2) : "FREE"}
            </Text>
          </Flex>
        </Flex>

        <Span mt={2} borderBottom="1px solid" w="100%" />
        <Flex mb={4} mt={3} flexGrow={0}>
          <Text fs={"1.8rem"} fw={500} mr={4}>
            Total:
          </Text>
          <Flex justifyContent="flex-end">
            <Text fs={"1.8rem"} fw={500}>
              ${cartTotal.toFixed(2)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

const Form = connect(
  state => mapStateToProps(state, ["cart", "billingForm", "shippingForm"]),
  null
)(_Form);

function Confirm(props) {
  return (
    <Flex
      pl={r("2 3 -> 4 5")}
      pr={r("2 3 -> 4 5")}
      w={"100%"}
      h={"100%"}
      justifyContent="center"
      transition="padding 0.3s"
    >
      <Form />
    </Flex>
  );
}

export default Confirm;
