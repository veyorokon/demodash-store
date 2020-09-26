import {Box, Text} from "components";
import React from "react";
import {connect} from "react-redux";
import styled, {css} from "styled-components";

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
  return (
    <Hide isShowing={props.checkoutDrawerOpen}>
      <Text>Test</Text>
    </Hide>
  );
}

const mapStateToProps = state => {
  const {checkoutDrawerOpen} = state;
  return {
    checkoutDrawerOpen
  };
};
//
// function mapDispatchToProps(dispatch) {
//   return {
//     updateDemoCheckoutForm: payload => dispatch(updateDemoCheckoutForm(payload))
//   };
// }

export default connect(
  mapStateToProps,
  null
)(_Checkout);
