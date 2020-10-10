import React from "react";
import {Flex, Text} from "components";
import {CheckoutCard} from "views/Store/Components";
import {connect} from "react-redux";
import {mapStateToProps, isEmpty} from "lib";

function _Overview(props) {
  if (!isEmpty(props.cart)) console.log(props.cart);

  return (
    <Flex flexDirection="column">
      <CheckoutCard />
      <Text>test 1</Text>
    </Flex>
  );
}

const Overview = connect(
  state => mapStateToProps(state, ["cart"]),
  null
)(_Overview);

export default Overview;
