import {Flex, Text} from "components";
import React from "react";
import {connect} from "react-redux";
import styled, {css} from "styled-components";
import {mapStateToProps} from "lib";

const Hide = styled(Flex)`
  transition: opacity 0.8s ease-in-out;
  visibility: hidden;
  height: 0;
  width: 0;
  opacity: 0;
  display: none;
  ${props =>
    props.isShowing &&
    css`
      height: 100%;
      width: 100%;
      opacity: 1;
      visibility: visible;
      display: flex;
      flex-grow: 1;
    `}
`;

function _Checkout(props) {
  console.log(props);
  return (
    <Hide bg={"whites.0"} isShowing={props.checkoutDrawerOpen}>
      <Flex h="100%" flexDirection="column">
        <Text>Test</Text>
      </Flex>
    </Hide>
  );
}

export default connect(
  state => mapStateToProps(state, ["checkoutDrawerOpen"]),
  null
)(_Checkout);
