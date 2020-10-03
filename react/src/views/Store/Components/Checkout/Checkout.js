import {Flex} from "components";
import React, {useState} from "react";
import {Overview} from "./Sections";
import {connect} from "react-redux";
import styled, {css} from "styled-components";
import {mapStateToProps} from "lib";

const Hide = styled(Flex)`
  transition: opacity 0.8s ease-in-out;
  visibility: hidden;
  width: 0;
  opacity: 0;
  display: none;
  ${props =>
    props.isShowing &&
    css`
      width: 100%;
      opacity: 1;
      visibility: visible;
      display: flex;
      flex-grow: 1;
    `}
`;

function _Checkout(props) {
  console.log(props);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <Hide
      onClick={() => {
        let nextIndex = (currentIndex + 1) % props.children.length;
        setCurrentIndex(nextIndex);
      }}
      bg={"whites.0"}
      isShowing={props.checkoutDrawerOpen}
    >
      {props.children.map((component, index) => (
        <>{currentIndex === index && component}</>
      ))}
    </Hide>
  );
}

const Checkout = connect(
  state => mapStateToProps(state, ["checkoutDrawerOpen"]),
  null
)(_Checkout);

export default props => (
  <Checkout>
    <Overview />
    <Overview />
  </Checkout>
);
