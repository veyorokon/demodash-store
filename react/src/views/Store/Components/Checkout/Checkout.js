import {Flex} from "components";
import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
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
    <Hide h={"100vh"} isShowing={props.checkoutDrawerOpen}>
      <Flex flexDirection="column">
        <Header />
        <Flex flexBasis={"80vh"}>
          {props.children.map((component, index) => (
            <>{currentIndex === index && component}</>
          ))}
        </Flex>
        <Footer
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          numChildren={props.children.length}
        />
      </Flex>
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
