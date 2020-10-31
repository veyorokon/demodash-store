import {Flex} from "components";
import React, {useState} from "react";
import Header from "./Header";
import Nav from "./Nav";
import {Overview, Shipping, Billing, Confirm} from "./Sections";
import Footer from "./Footer";
import {connect} from "react-redux";
import styled, {css} from "styled-components";
import {mapStateToProps, responsive as r} from "lib";
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
  const {checkoutDrawerOpen, checkoutMaxIndex} = props;
  const [currentIndex, setCurrentIndex] = useState(1);
  const tranformSpring = useSpring({
    transform: checkoutDrawerOpen
      ? "translate3d(0, 0px, 0px)"
      : "translate3d(50vw, 0px, 0px)",
    from: {transform: "translate3d(50vw, 0px, 0px)"}
  });
  console.log(currentIndex < checkoutMaxIndex);
  return (
    <Hide h={"85vh"} isShowing={checkoutDrawerOpen}>
      <AnimatedFlex style={tranformSpring}>
        <Header
          header={props.headers[currentIndex]}
          flexGrow={0}
          flexBasis={"10vh"}
        />
        <Nav
          checkoutMaxIndex={checkoutMaxIndex}
          handleUpdateIndex={setCurrentIndex}
          currentIndex={currentIndex}
          flexBasis={"5vh"}
        />
        <Flex flexBasis={"55vh"}>
          {props.children.map((component, index) => (
            <Flex
              w={currentIndex === index ? "100%" : "0"}
              h={currentIndex === index ? "100%" : "0"}
              key={index}
            >
              {currentIndex === index &&
                React.cloneElement(component, {index: index})}
            </Flex>
          ))}
        </Flex>
        <Footer
          flexGrow={0}
          disabled={currentIndex >= checkoutMaxIndex}
          footer={props.footers[currentIndex]}
          flexBasis={"10vh"}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          maxLength={props.children.length}
        />
      </AnimatedFlex>
    </Hide>
  );
}

const Checkout = connect(
  state => mapStateToProps(state, ["checkoutDrawerOpen", "checkoutMaxIndex"]),
  null
)(_Checkout);

export default props => (
  <Checkout
    headers={["Overview", "Shipping", "Billing", "Confirm"]}
    footers={r("Continue --> Confirm")}
  >
    <Overview />
    <Shipping />
    <Billing />
    <Confirm />
  </Checkout>
);
