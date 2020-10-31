import React from "react";
import {Flex, Text, Input, Span, DropDown} from "components";
import {updateShippingForm, updateCheckoutMaxIndex} from "redux/actions";
import {connect} from "react-redux";
import {STATES, mapStateToProps, responsive as r, getEventVal} from "lib";

function FormInput(props) {
  return <Input p={2} h={"3.5rem"} flexGrow={0} {...props} />;
}

function FlexRow(props) {
  return (
    <Flex flexGrow={0} justifyContent="space-between" {...props}>
      {props.children}
    </Flex>
  );
}

function removeFromList(array, item) {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

function checkRequiredFields(form, requiredFields = []) {
  let missing = [];
  for (var i = 0; i < requiredFields.length; i++) {
    const key = requiredFields[i];
    if (!form[key]) missing.push(key);
  }
  return missing;
}

function _Form(props) {
  const {
    index,
    shippingForm,
    updateCheckoutMaxIndex,
    updateShippingForm
  } = props;
  const requiredFields = [
    "name",
    "addressLine1",
    "state",
    "city",
    "zip",
    "email"
  ];
  console.log(props);
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
                requiredFields
              );
              let val = getEventVal(evt);
              if (val) {
                errorFields = removeFromList(errorFields, "name");
              } else {
                errorFields = ["name"];
              }
              updateShippingForm({
                ...shippingForm,
                name: getEventVal(evt),
                errorFields: errorFields
              });
              updateCheckoutMaxIndex({
                checkoutMaxIndex: index + 1
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
              updateShippingForm({
                ...shippingForm,
                email: getEventVal(evt)
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
            onChange={evt =>
              updateShippingForm({
                ...shippingForm,
                addressLine1: getEventVal(evt)
              })
            }
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
            onChange={evt =>
              updateShippingForm({
                ...shippingForm,
                city: getEventVal(evt)
              })
            }
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
            border={"1px solid "}
            options={STATES}
            name="state"
            onChange={evt =>
              updateShippingForm({
                ...shippingForm,
                state: getEventVal(evt)
              })
            }
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
            onChange={evt =>
              updateShippingForm({
                ...shippingForm,
                zip: getEventVal(evt)
              })
            }
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
