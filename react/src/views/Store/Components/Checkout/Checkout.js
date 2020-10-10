import {Flex, Span} from "components";
import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";
import {Overview} from "./Sections";
import {connect} from "react-redux";
import styled, {css} from "styled-components";
import {mapStateToProps} from "lib";
import {useSpring, animated} from "react-spring";

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
    `}
`;

const AnimatedFlex = styled(animated.div)`
  flex-direction: column;
  width: 100%;
  display: flex;
`;

function _Checkout(props) {
  console.log(props);
  const {checkoutDrawerOpen} = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const tranformSpring = useSpring({
    transform: checkoutDrawerOpen
      ? "translate3d(0, 0px, 0px)"
      : "translate3d(50vw, 0px, 0px)",
    from: {transform: "translate3d(50vw, 0px, 0px)"}
  });
  return (
    <Hide h={"85vh"} isShowing={checkoutDrawerOpen}>
      <AnimatedFlex style={tranformSpring}>
        <Header
          header={props.headers[currentIndex]}
          flexGrow={0}
          flexBasis={"10vh"}
        />
        <Nav currentIndex={currentIndex} flexBasis={"5vh"} />
        <Flex flexBasis={"55vh"}>
          {props.children.map((component, index) => (
            <Span key={index}>{currentIndex === index && component}</Span>
          ))}
        </Flex>
        <Footer
          flexGrow={0}
          flexBasis={"10vh"}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          numChildren={props.children.length}
        />
      </AnimatedFlex>
    </Hide>
  );
}

const Checkout = connect(
  state => mapStateToProps(state, ["checkoutDrawerOpen"]),
  null
)(_Checkout);

export default props => (
  <Checkout headers={["Overview", "Shipping"]}>
    <Overview />
    <Overview />
  </Checkout>
);
