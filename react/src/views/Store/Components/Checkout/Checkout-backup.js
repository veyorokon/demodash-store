import {Box} from "components";
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
    props.showing &&
    css`
      height: 100%;
      width: 100%;
      opacity: 1;
      visibility: visible;
      display: block;
    `}
`;

class _Checkout extends React.Component {
  render() {
    const {demoCheckoutForm} = this.props;
    return (
      <>
        {this.props.children.length ? (
          this.props.children.map((elem, index) => (
            <Hide
              flexGrow={0}
              key={index}
              showing={demoCheckoutForm.currentPanel === index}
            >
              test 1
            </Hide>
          ))
        ) : (
          <>test 2</>
        )}
      </>
    );
  }
}

// const mapStateToProps = state => {
//   const {demoCheckoutForm} = state;
//   return {
//     demoCheckoutForm
//   };
// };
//
// function mapDispatchToProps(dispatch) {
//   return {
//     updateDemoCheckoutForm: payload => dispatch(updateDemoCheckoutForm(payload))
//   };
// }

export default connect(
  null,
  null
)(_Checkout);
