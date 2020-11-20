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
  let checkoutTokens = Object.keys(cart);
  let keys = new Set(
    checkoutTokens.map(checkoutToken => {
      let tokens = checkoutToken.split("-");
      let brandId = tokens[0];
      return brandId;
    })
  );
  let brands = Array.from(keys);
  brands.forEach(function(brandId) {
    let brandItems = checkoutTokens.filter(function(token) {
      return token.indexOf(brandId) === 0;
    });
    let checkoutItems = [];
    brandItems.forEach(function(token) {
      const item = cart[token];
      let demoCommissionId = token.split("-")[1];
      const {variationsChosen} = item;
      let itemVariations = Object.keys(variationsChosen).map(key => {
        return {variationId: parseInt(variationsChosen[key])};
      });
      checkoutItems.push({
        demoCommissionId: parseInt(demoCommissionId),
        productId: parseInt(item.product.id),
        quantity: parseInt(item.amount),
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
  console.log(cart);
  console.log(cartCheckouts);
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
          if (cartCheckouts.length && nextIndex < props.maxLength) {
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
          {mutationLoading ? "Loading..." : props.footer}
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
  state =>
    mapStateToProps(state, [
      "cart",
      "billingForm",
      "shippingForm",
      "checkoutIndex"
    ]),
  mapDispatchToProps
)(_Footer);

export default Footer;
