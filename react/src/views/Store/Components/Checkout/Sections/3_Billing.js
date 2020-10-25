import React from "react";
import {Flex, Text, Link, Input, Box, Span} from "components";
import {updateBillingForm} from "redux/actions";
import {connect} from "react-redux";
import {mapStateToProps, responsive as r, getEventVal} from "lib";

function format(s) {
  return s.toString().replace(/\d{4}(?=.)/g, "$& ");
}
function FormInput(props) {
  return <Input p={2} h={"3.5rem"} flexGrow={0} {...props} />;
}

function FlexRow(props) {
  return (
    <Flex
      flexGrow={0}
      flexDirection={r("column --> row")}
      justifyContent="space-between"
      {...props}
    >
      {props.children}
    </Flex>
  );
}

function _Form(props) {
  const {billingForm, updateBillingForm} = props;
  console.log(billingForm);
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
            name="cardnumber"
            value={
              billingForm.cardNumber
                ? format(billingForm.cardNumber.replace(/\s/g, ""))
                : ""
            }
            onChange={evt => {
              let value = getEventVal(evt);
              if (!isNaN(value.replace(/\s/g, "")))
                return updateBillingForm({
                  ...billingForm,
                  cardNumber: value.replace(/\s/g, "")
                });
            }}
            autocorrect="off"
          />
          <Text mt={1}>Card number</Text>
        </Flex>
      </FlexRow>
      <FlexRow mb={3} flexDirection="row">
        <Flex w={"33%"} mt={3} flexDirection="column">
          <FormInput
            maxLength={2}
            value={billingForm.expMonth || ""}
            onChange={evt => {
              let value = getEventVal(evt);
              if (!isNaN(value))
                return updateBillingForm({
                  ...billingForm,
                  expMonth: value
                });
            }}
            autocorrect="off"
            mr={1}
          />
          <Text mt={1}>Exp month</Text>
        </Flex>
        <Flex w={"33%"} mt={3} flexDirection="column">
          <FormInput
            maxLength={4}
            value={billingForm.expYear || ""}
            onChange={evt => {
              let value = getEventVal(evt);
              if (!isNaN(value))
                return updateBillingForm({
                  ...billingForm,
                  expYear: value
                });
            }}
            autocorrect="off"
            mr={1}
          />
          <Text mt={1}>Exp year</Text>
        </Flex>
        <Flex w={"33%"} mt={3} flexDirection="column">
          <FormInput
            maxLength={3}
            name="cvc"
            value={billingForm.cvc || ""}
            onChange={evt => {
              let value = getEventVal(evt);
              if (!isNaN(value))
                return updateBillingForm({
                  ...billingForm,
                  cvc: value
                });
            }}
            autocorrect="off"
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
    updateBillingForm: payload => dispatch(updateBillingForm(payload))
  };
}

const Form = connect(
  state => mapStateToProps(state, ["billingForm"]),
  mapDispatchToProps
)(_Form);

function Shipping(props) {
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

export default Shipping;
