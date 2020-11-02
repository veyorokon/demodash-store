import React from "react";
import {Flex, Button, Text} from "components";
import {useMutation} from "@apollo/client";
import styled from "styled-components";
import {mapStateToProps, responsive as r} from "lib";
import {connect} from "react-redux";
import {setCheckoutIndex, setCheckoutSuccessful} from "redux/actions";
import {CREATE_PURCHASE} from "views/Store/gql";

const CheckoutButton = styled(Button)`
  outline: none;
  border: none;
`;

function formatCheckouts(cart) {
  let checkouts = [];
  Object.keys(cart).forEach(function(brandId) {
    let checkoutItems = [];
    Object.keys(cart[brandId]).forEach(function(checkoutToken) {
      let demoCommissionId = checkoutToken.split("-")[1]; //Hacky
      const checkout = cart[brandId][checkoutToken];
      //console.log(checkout)
      const {variationsChosen} = checkout;
      let itemVariations = Object.keys(variationsChosen).map(key => {
        return {variationId: parseInt(variationsChosen[key])};
      });
      checkoutItems.push({
        demoCommissionId: parseInt(demoCommissionId),
        productId: parseInt(checkout.product.id),
        quantity: parseInt(checkout.amount),
        itemVariations
      });
    });
    let sellerCheckout = {
      sellerAccountId: parseInt(brandId),
      checkoutItems
    };
    checkouts.push(sellerCheckout);
  });
  return checkouts;
}

function _Footer(props) {
  const {
    cart,
    demodashStoreId,
    billingForm,
    shippingForm,
    checkoutIndex,
    setCheckoutIndex,
    setCheckoutSuccessful
  } = props;
  const [
    createPurchase,
    {
      loading: mutationLoading, //error: mutationError,
      data
    }
  ] = useMutation(CREATE_PURCHASE);
  let disabled = props.disabled && checkoutIndex !== props.maxLength - 1;
  disabled = disabled || (mutationLoading || data !== undefined);
  const cartCheckouts = formatCheckouts(cart);
  if (data) {
    setCheckoutSuccessful({
      checkoutSuccessful: true
    });
  }
  return (
    <Flex
      pl={r("2 3 -> 4 5")}
      pr={r("2 3 -> 4 5")}
      transition="padding 0.3s"
      justifyContent="center"
      h={"fit-content"}
      {...props}
    >
      <CheckoutButton
        h={5}
        w={r("100% --> 60rem")}
        minWidth="26rem"
        maxWidth={r("100% -----> 60rem")}
        disabled={disabled}
        bg={disabled ? "navys.3" : "navys.1"}
        transition="background 0.3s"
        cursor={"pointer"}
        onClick={() => {
          let nextIndex = checkoutIndex + 1;
          if (nextIndex < props.maxLength) {
            setCheckoutIndex({checkoutIndex: nextIndex % props.maxLength});
          } else {
            const variables = {
              cartCheckouts,
              billingForm,
              shippingForm,
              demodashStoreId
            };
            createPurchase({variables});
          }
        }}
      >
        <Text color="whites.0" fs={3} ml="auto" mr="auto">
          {disabled ? "Loading..." : props.footer}
        </Text>
      </CheckoutButton>
    </Flex>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setCheckoutIndex: payload => dispatch(setCheckoutIndex(payload)),
    setCheckoutSuccessful: payload => dispatch(setCheckoutSuccessful(payload))
  };
}

const Footer = connect(
  state => mapStateToProps(state, ["cart", "billingForm", "shippingForm"]),
  mapDispatchToProps
)(_Footer);

export default Footer;
