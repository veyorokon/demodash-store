import {Flex, Text, Icon} from "components";
import React from "react";
import {CloseCircle} from "@styled-icons/ionicons-outline/CloseCircle";
import {connect} from "react-redux";
import {toggleCheckoutDrawer} from "redux/actions";

function _Footer(props) {
  const {toggleCheckoutDrawer} = props;
  return (
    <Flex
      alignItems="center"
      p={3}
      justifyContent="center"
      h={"fit-content"}
      {...props}
    >
      <Icon onClick={() => toggleCheckoutDrawer()} h={"3.6rem"}>
        <CloseCircle />
      </Icon>
      <Text fs={3} ml="auto" mr="auto">
        {props.header}
      </Text>
    </Flex>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    toggleCheckoutDrawer: () => dispatch(toggleCheckoutDrawer())
  };
}

export default connect(
  null,
  mapDispatchToProps
)(_Footer);
