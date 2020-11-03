import React from "react";
import {Flex, Text, Span, DropDown} from "components";
import {FlexRow, FormInput} from "./components";
import {checkRequiredFields, removeFromList} from "./utils";
import {updateShippingForm, updateCheckoutMaxIndex} from "redux/actions";
import {connect} from "react-redux";
import {STATES, mapStateToProps, responsive as r, getEventVal} from "lib";

const REQUIRED_FIELDS = [
  "name",
  "addressLine1",
  "state",
  "city",
  "zip",
  "email"
];

function _Form(props) {
  const {
    index,
    shippingForm,
    updateCheckoutMaxIndex,
    updateShippingForm
  } = props;

  return (
    <Flex
      transition="max-width 0.3s"
      maxWidth={r("100% -----> 60rem")}
      flexDirection="column"
      mb={3}
    >
      <Span mt={2} borderBottom="1px solid #e3e3ee" w="100%" />
      <FlexRow mt={2}>
        <Flex w={"50%"} mt={3} flexDirection="column">
          <FormInput
            name="name"
            autocomplete="name"
            autocorrect="off"
            borderColor={
              shippingForm.errorFields &&
              shippingForm.errorFields.includes("name")
                ? "oranges.0"
                : "navys.0"
            }
            onChange={evt => {
              let errorFields = checkRequiredFields(
                shippingForm,
                REQUIRED_FIELDS
              );
              let val = getEventVal(evt);
              if (val) {
                errorFields = removeFromList(errorFields, "name");
              } else {
                errorFields.push("name");
              }
              //checkRequiredFields
              updateShippingForm({
                ...shippingForm,
                name: getEventVal(evt)
              });
              if (!errorFields.length)
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index + 1
                });
              else
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index
                });
            }}
            value={shippingForm.name || ""}
          />
          <Text mt={1}>Name</Text>
        </Flex>
      </FlexRow>
      <FlexRow>
        <Flex mt={3} flexDirection="column">
          <FormInput
            type="email"
            autocomplete="email"
            name="email"
            borderColor={
              shippingForm.errorFields &&
              shippingForm.errorFields.includes("email")
                ? "oranges.0"
                : "navys.0"
            }
            onChange={evt => {
              let errorFields = checkRequiredFields(
                shippingForm,
                REQUIRED_FIELDS
              );
              let val = getEventVal(evt);
              if (val) {
                errorFields = removeFromList(errorFields, "email");
              } else {
                errorFields.push("email");
              }
              //checkRequiredFields
              updateShippingForm({
                ...shippingForm,
                email: getEventVal(evt)
              });
              if (!errorFields.length)
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index + 1
                });
              else
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index
                });
            }}
            value={shippingForm.email || ""}
          />
          <Text mt={1}>Email</Text>
        </Flex>
      </FlexRow>
      <FlexRow>
        <Flex mt={3} flexDirection="column">
          <FormInput
            name="address-line1"
            borderColor={
              shippingForm.errorFields &&
              shippingForm.errorFields.includes("addressLine1")
                ? "oranges.0"
                : "navys.0"
            }
            onChange={evt => {
              let errorFields = checkRequiredFields(
                shippingForm,
                REQUIRED_FIELDS
              );
              let val = getEventVal(evt);
              if (val) {
                errorFields = removeFromList(errorFields, "addressLine1");
              } else {
                errorFields.push("addressLine1");
              }
              //checkRequiredFields
              updateShippingForm({
                ...shippingForm,
                addressLine1: getEventVal(evt)
              });
              if (!errorFields.length)
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index + 1
                });
              else
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index
                });
            }}
            value={shippingForm.addressLine1 || ""}
          />
          <Text mt={1}>Address line 1</Text>
        </Flex>
      </FlexRow>
      <FlexRow>
        <Flex mt={3} flexDirection="column">
          <FormInput
            name="address-line2"
            onChange={evt =>
              updateShippingForm({
                ...shippingForm,
                addressLine2: getEventVal(evt)
              })
            }
            value={shippingForm.addressLine2 || ""}
          />
          <Text mt={1}>Address line 2</Text>
        </Flex>
      </FlexRow>
      <FlexRow>
        <Flex mt={3} flexDirection="column">
          <FormInput
            name="city"
            borderColor={
              shippingForm.errorFields &&
              shippingForm.errorFields.includes("city")
                ? "oranges.0"
                : "navys.0"
            }
            onChange={evt => {
              let errorFields = checkRequiredFields(
                shippingForm,
                REQUIRED_FIELDS
              );
              let val = getEventVal(evt);
              if (val) {
                errorFields = removeFromList(errorFields, "city");
              } else {
                errorFields.push("city");
              }
              //checkRequiredFields
              updateShippingForm({
                ...shippingForm,
                city: getEventVal(evt)
              });
              if (!errorFields.length)
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index + 1
                });
              else
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index
                });
            }}
            value={shippingForm.city || ""}
          />
          <Text mt={1}>City</Text>
        </Flex>
      </FlexRow>
      <FlexRow>
        <Flex
          transition="width 0.3s"
          mr={1}
          w={r("66% ---> 60%")}
          mt={3}
          flexDirection="column"
        >
          <DropDown
            br={2}
            w="100%"
            options={STATES}
            name="state"
            borderColor={
              shippingForm.errorFields &&
              shippingForm.errorFields.includes("state")
                ? "oranges.0"
                : "navys.0"
            }
            onChange={evt => {
              let errorFields = checkRequiredFields(
                shippingForm,
                REQUIRED_FIELDS
              );
              let val = getEventVal(evt);
              if (val) {
                errorFields = removeFromList(errorFields, "state");
              } else {
                errorFields.push("state");
              }
              //checkRequiredFields
              updateShippingForm({
                ...shippingForm,
                state: getEventVal(evt)
              });
              if (!errorFields.length)
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index + 1
                });
              else
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index
                });
            }}
            value={shippingForm.state || ""}
          />
          <Text mt={1}>State</Text>
        </Flex>
        <Flex
          transition="width 0.3s"
          w={r("33% ---> 40%")}
          mt={3}
          flexDirection="column"
        >
          <FormInput
            type="number"
            name="zip"
            borderColor={
              shippingForm.errorFields &&
              shippingForm.errorFields.includes("zip")
                ? "oranges.0"
                : "navys.0"
            }
            onChange={evt => {
              let errorFields = checkRequiredFields(
                shippingForm,
                REQUIRED_FIELDS
              );
              let val = getEventVal(evt);
              if (val) {
                errorFields = removeFromList(errorFields, "zip");
              } else {
                errorFields.push("zip");
              }
              //checkRequiredFields
              updateShippingForm({
                ...shippingForm,
                zip: getEventVal(evt)
              });
              if (!errorFields.length)
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index + 1
                });
              else
                updateCheckoutMaxIndex({
                  checkoutMaxIndex: index
                });
            }}
            value={shippingForm.zip || ""}
          />
          <Text mt={1}>Zip</Text>
        </Flex>
      </FlexRow>
    </Flex>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    updateShippingForm: payload => dispatch(updateShippingForm(payload)),
    updateCheckoutMaxIndex: payload => dispatch(updateCheckoutMaxIndex(payload))
  };
}

const Form = connect(
  state => mapStateToProps(state, ["shippingForm"]),
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
      <Form {...props} />
    </Flex>
  );
}

export default Shipping;
