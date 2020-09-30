import {Box, Text} from "components";
import React from "react";
import {connect} from "react-redux";
import styled, {css} from "styled-components";
import {mapStateToProps} from "lib";

const Hide = styled(Box)`
  transition: opacity 0.8s ease-in-out;
  visibility: hidden;
  height: 0;
  width: 0;
  opacity: 0;
  max-height: fit-content;
  display: none;
  ${props =>
    props.isShowing &&
    css`
      height: 100%;
      width: 100%;
      opacity: 1;
      visibility: visible;
      display: block;
    `}
`;

function _Checkout(props) {
  console.log(props);
  return (
    <Hide isShowing={props.checkoutDrawerOpen}>
      <Text>Test</Text>
    </Hide>
  );
}

export default connect(
  state => mapStateToProps(state, ["checkoutDrawerOpen"]),
  null
)(_Checkout);
