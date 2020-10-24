import React from "react";
import {Flex, Text, Input} from "components";
import {updateShippingForm} from "redux/actions";
import {connect} from "react-redux";
import {responsive as r, getEventVal} from "lib";

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
  const {updateShippingForm} = props;
  return (
    <Flex
      transition="max-width 0.3s"
      maxWidth={r("100% -----> 60rem")}
      flexDirection="column"
    >
      <FlexRow>
        <Flex mt={3} flexDirection="column">
          <FormInput
            onChange={evt => {
              updateShippingForm({
                firstName: getEventVal(evt)
              });
            }}
            mr={r("0 --> 3")}
          />
          <Text mt={1}>First name</Text>
        </Flex>
        <Flex mt={3} flexDirection="column">
          <FormInput ml={r("0 --> 3")} />
          <Text ml={r("0 --> 3")} mt={1}>
            Last name
          </Text>
        </Flex>
      </FlexRow>
      <FlexRow>
        <Flex mt={3} flexDirection="column">
          <FormInput />
          <Text mt={1}>Email</Text>
        </Flex>
      </FlexRow>
      <FlexRow>
        <Flex mt={3} flexDirection="column">
          <FormInput />
          <Text mt={1}>Address line 1</Text>
        </Flex>
      </FlexRow>
      <FlexRow>
        <Flex mt={3} flexDirection="column">
          <FormInput />
          <Text mt={1}>Address line 2</Text>
        </Flex>
      </FlexRow>
      <FlexRow>
        <Flex mt={3} flexDirection="column">
          <FormInput />
          <Text mt={1}>City</Text>
        </Flex>
      </FlexRow>
      <FlexRow>
        <Flex mt={3} flexDirection="column">
          <FormInput mr={r("0 --> 3")} />
          <Text mr={r("0 --> 3")} mt={1}>
            State
          </Text>
        </Flex>
        <Flex mt={3} flexDirection="column">
          <FormInput />
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
  null,
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
