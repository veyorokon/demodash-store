import {Flex, Text} from "components";
import React from "react";
import {connect} from "react-redux";
import {toggleCheckoutDrawer} from "redux/actions";

function _Footer(props) {
  const {toggleCheckoutDrawer} = props;
  return (
    <Flex p={3} justifyContent="center" flexBasis={"10vh"} h={"fit-content"}>
      <Text onClick={() => toggleCheckoutDrawer()} fs={3} ml="auto" mr="auto">
        close
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
