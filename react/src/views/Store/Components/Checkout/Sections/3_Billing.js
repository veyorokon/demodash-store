import React from "react";
import {Flex, Text, Link, Box, Span} from "components";
import {FlexRow, FormInput} from "./components";
import {format, checkRequiredFields, removeFromList} from "./utils";
import {updateBillingForm, updateCheckoutMaxIndex} from "redux/actions";
import {connect} from "react-redux";
import {mapStateToProps, responsive as r, getEventVal} from "lib";

const REQUIRED_FIELDS = [
  "cardNumber",
  "cardExpirationMonth",
  "cardExpirationYear",
  "cvc"
];

function _Form(props) {
  const {index, billingForm, updateBillingForm, updateCheckoutMaxIndex} = props;
  return (
    <Flex
      transition="max-width 0.3s"
      maxWidth={r("100% -----> 60rem")}
      flexDirection="column"
    >
      <Span mt={2} borderBottom="1px solid #e3e3ee" w="100%" />
      <FlexRow mt={2}>
        <Flex mt={3} flexDirection="column">
          <FormInput
            maxLength={19}
            name="cardNumber"
            id="cardNumber"
            value={
              billingForm.cardNumber
                ? format(billingForm.cardNumber.replace(/\s/g, ""))
                : ""
            }
            borderColor={
              billingForm.errorFields &&
              billingForm.errorFields.includes("cardNumber")
                ? "oranges.0"
                : "navys.0"
            }
            onChange={evt => {
              let errorFields = checkRequiredFields(
                billingForm,
                REQUIRED_FIELDS
              );
              let val = getEventVal(evt);
              //checkRequiredFields
              if (val) {
                errorFields = removeFromList(errorFields, "cardNumber");
              } else {
                errorFields.push("cardNumber");
              }
              if (!isNaN(val.replace(/\s/g, ""))) {
                updateBillingForm({
                  ...billingForm,
                  cardNumber: val.replace(/\s/g, ""),
                  errorFields: errorFields
                });
              }
              if (!errorFields.length)
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index + 1
                });
              else
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index
                });
            }}
          />
          <Text mt={1}>Card number</Text>
        </Flex>
      </FlexRow>
      <FlexRow mb={3} flexDirection="row">
        <Flex w={"33%"} mt={3} flexDirection="column">
          <FormInput
            maxLength={2}
            id="cardExpirationMonth"
            value={billingForm.cardExpirationMonth || ""}
            mr={1}
            borderColor={
              billingForm.errorFields &&
              billingForm.errorFields.includes("cardExpirationMonth")
                ? "oranges.0"
                : "navys.0"
            }
            onChange={evt => {
              let errorFields = checkRequiredFields(
                billingForm,
                REQUIRED_FIELDS
              );
              let val = getEventVal(evt);
              //checkRequiredFields
              if (val) {
                errorFields = removeFromList(
                  errorFields,
                  "cardExpirationMonth"
                );
              } else {
                errorFields.push("cardExpirationMonth");
              }
              if (!isNaN(val.replace(/\s/g, ""))) {
                updateBillingForm({
                  ...billingForm,
                  cardExpirationMonth: val,
                  errorFields: errorFields
                });
              }
              if (!errorFields.length)
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index + 1
                });
              else
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index
                });
            }}
          />
          <Text mt={1}>Exp month</Text>
        </Flex>
        <Flex w={"33%"} mt={3} flexDirection="column">
          <FormInput
            maxLength={4}
            id="cardExpirationYear"
            value={billingForm.cardExpirationYear || ""}
            mr={1}
            borderColor={
              billingForm.errorFields &&
              billingForm.errorFields.includes("cardExpirationYear")
                ? "oranges.0"
                : "navys.0"
            }
            onChange={evt => {
              let errorFields = checkRequiredFields(
                billingForm,
                REQUIRED_FIELDS
              );
              let val = getEventVal(evt);
              //checkRequiredFields
              if (val) {
                errorFields = removeFromList(errorFields, "cardExpirationYear");
              } else {
                errorFields.push("cardExpirationYear");
              }
              if (!isNaN(val.replace(/\s/g, ""))) {
                updateBillingForm({
                  ...billingForm,
                  cardExpirationYear: val,
                  errorFields: errorFields
                });
              }
              if (!errorFields.length)
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index + 1
                });
              else
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index
                });
            }}
          />
          <Text mt={1}>Exp year</Text>
        </Flex>
        <Flex w={"33%"} mt={3} flexDirection="column">
          <FormInput
            maxLength={3}
            name="cvc"
            id="cardCsc"
            value={billingForm.cvc || ""}
            borderColor={
              billingForm.errorFields && billingForm.errorFields.includes("cvc")
                ? "oranges.0"
                : "navys.0"
            }
            onChange={evt => {
              let errorFields = checkRequiredFields(
                billingForm,
                REQUIRED_FIELDS
              );
              let val = getEventVal(evt);
              //checkRequiredFields
              if (val) {
                errorFields = removeFromList(errorFields, "cvc");
              } else {
                errorFields.push("cvc");
              }
              if (!isNaN(val.replace(/\s/g, ""))) {
                updateBillingForm({
                  ...billingForm,
                  cvc: val,
                  errorFields: errorFields
                });
              }
              if (!errorFields.length)
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index + 1
                });
              else
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index
                });
            }}
          />
          <Text mt={1}>CVC</Text>
        </Flex>
      </FlexRow>
      <Box
        mt={3}
        lineHeight={"3rem"}
        br={2}
        p={r("3 -> 4")}
        transition="padding 0.2s"
        border="2px solid rgb(230, 235, 241)"
        color={"blues.1"}
      >
        <Text color={"greys.0"} display="inline">
          We use
        </Text>{" "}
        <Link
          cursor={"pointer"}
          fs="1.4rem"
          fw={"400"}
          display="inline"
          href="https://stripe.com"
          target="_blank"
        >
          Stripe
        </Link>{" "}
        <Text color={"greys.0"} display="inline">
          to keep your personal payment information secure. Click
        </Text>{" "}
        <Text fw={500} color={"navys.1"} display="inline">
          Continue
        </Text>{" "}
        <Text color={"greys.0"} display="inline">
          to confirm and place your order on the next page.
        </Text>
      </Box>
    </Flex>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    updateBillingForm: payload => dispatch(updateBillingForm(payload)),
    updateCheckoutMaxIndex: payload => dispatch(updateCheckoutMaxIndex(payload))
  };
}

const Form = connect(
  state => mapStateToProps(state, ["billingForm"]),
  mapDispatchToProps
)(_Form);

function Billing(props) {
  return (
    <Flex
      pl={r("2 3 -> 4 5")}
      pr={r("2 3 -> 4 5")}
      w={"100%"}
      h={"100%"}
      justifyContent="center"
      transition="padding 0.3s"
    >
      <Form {...props} />
    </Flex>
  );
}

export default Billing;
