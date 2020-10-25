import React from "react";
import {Flex, Text, Input, Span} from "components";
import {updateShippingForm} from "redux/actions";
import {connect} from "react-redux";
import {mapStateToProps, responsive as r, getEventVal} from "lib";

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
  const {shippingForm, updateShippingForm} = props;
  return (
    <Flex
      transition="max-width 0.3s"
      maxWidth={r("100% -----> 60rem")}
      flexDirection="column"
      mb={3}
    >
      <Span mt={2} borderBottom="1px solid #e3e3ee" w="100%" />
      <FlexRow mt={2}>
        <Flex mt={3} flexDirection="column">
          <FormInput
            autocorrect="off"
            onChange={evt =>
              updateShippingForm({
                ...shippingForm,
                firstName: getEventVal(evt)
              })
            }
            value={shippingForm.firstName || ""}
            mr={r("0 --> 3")}
          />
          <Text mt={1}>First name</Text>
        </Flex>
        <Flex mt={3} flexDirection="column">
          <FormInput
            autocorrect="off"
            onChange={evt =>
              updateShippingForm({
                ...shippingForm,
                lastName: getEventVal(evt)
              })
            }
            value={shippingForm.lastName || ""}
          />
          <Text mt={1}>Last name</Text>
        </Flex>
      </FlexRow>
      <FlexRow>
        <Flex mt={3} flexDirection="column">
          <FormInput
            type="email"
            onChange={evt =>
              updateShippingForm({
                ...shippingForm,
                email: getEventVal(evt)
              })
            }
            value={shippingForm.email || ""}
          />
          <Text mt={1}>Email</Text>
        </Flex>
      </FlexRow>
      <FlexRow>
        <Flex mt={3} flexDirection="column">
          <FormInput
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
        <Flex mt={3} flexDirection="column">
          <FormInput
            mr={r("0 --> 3")}
            onChange={evt =>
              updateShippingForm({
                ...shippingForm,
                state: getEventVal(evt)
              })
            }
            value={shippingForm.state || ""}
          />
          <Text mr={r("0 --> 3")} mt={1}>
            State
          </Text>
        </Flex>
        <Flex mt={3} flexDirection="column">
          <FormInput
            type="number"
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
    updateShippingForm: payload => dispatch(updateShippingForm(payload))
  };
}

const Form = connect(
  state => mapStateToProps(state, ["shippingForm"]),
  mapDispatchToProps
)(_Form);

function Shipping(props) {
  return (
    <Flex
      pl={r("3 ---> 4")}
      pr={r("3 ---> 4")}
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
