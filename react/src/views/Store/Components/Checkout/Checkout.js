import {Flex, Text} from "components";
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import {Overview, Shipping, Billing, Confirm, Success} from "./Sections";
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

function calculateCartTotal(cart) {
  let amount = 0;
  for (const [, checkoutItem] of Object.entries(cart)) {
    for (const [, item] of Object.entries(checkoutItem)) {
      amount += item.amount;
    }
  }
  return amount;
}

function Body(props) {
  const {demodashStoreId, checkoutMaxIndex, checkoutIndex} = props;
  return (
    <>
      <Header
        header={props.headers[checkoutIndex]}
        flexGrow={0}
        flexBasis={"10vh"}
      />
      <Nav checkoutMaxIndex={checkoutMaxIndex} flexBasis={"5vh"} />
      <Flex flexBasis={"55vh"}>
        {props.children.map((component, index) => (
          <Flex
            w={checkoutIndex === index ? "100%" : "0"}
            h={checkoutIndex === index ? "100%" : "0"}
            key={index}
          >
            {checkoutIndex === index &&
              React.cloneElement(component, {index: index})}
          </Flex>
        ))}
      </Flex>
      <Footer
        flexGrow={0}
        demodashStoreId={demodashStoreId}
        disabled={checkoutIndex >= checkoutMaxIndex}
        footer={props.footers[checkoutIndex]}
        flexBasis={"10vh"}
        maxLength={props.children.length}
      />
    </>
  );
}

function _Checkout(props) {
  const {
    checkoutSuccessful,
    demodashStoreId,
    checkoutDrawerOpen,
    checkoutMaxIndex,
    checkoutIndex,
    cart
  } = props;
  const tranformSpring = useSpring({
    transform: checkoutDrawerOpen
      ? "translate3d(0, 0px, 0px)"
      : "translate3d(50vw, 0px, 0px)",
    from: {transform: "translate3d(50vw, 0px, 0px)"}
  });
  if (!calculateCartTotal(cart)) {
    return (
      <Hide h={"85vh"} isShowing={checkoutDrawerOpen}>
        <AnimatedFlex style={tranformSpring}>
          <Header
            wasSuccessful={checkoutSuccessful}
            header={"Nothing to see here..."}
            flexGrow={0}
            flexBasis={"10vh"}
          />
          <Text>Empty</Text>
        </AnimatedFlex>
      </Hide>
    );
  } else if (checkoutSuccessful)
    return (
      <Hide h={"85vh"} isShowing={checkoutDrawerOpen}>
        <AnimatedFlex style={tranformSpring}>
          <Header
            wasSuccessful={checkoutSuccessful}
            header={"Success"}
            flexGrow={0}
            flexBasis={"10vh"}
          />
          <Success />
        </AnimatedFlex>
      </Hide>
    );
  return (
    <Hide h={"85vh"} isShowing={checkoutDrawerOpen}>
      <AnimatedFlex style={tranformSpring}>
        <Body
          demodashStoreId={demodashStoreId}
          disabled={checkoutIndex >= checkoutMaxIndex}
          footer={props.footers[checkoutIndex]}
          checkoutIndex={checkoutIndex}
          maxLength={props.children.length}
          {...props}
        />
      </AnimatedFlex>
    </Hide>
  );
}

const Checkout = connect(
  state =>
    mapStateToProps(state, [
      "checkoutDrawerOpen",
      "checkoutMaxIndex",
      "checkoutSuccessful",
      "checkoutIndex",
      "cart"
    ]),
  null
)(_Checkout);

export default props => (
  <Checkout
    headers={["Overview", "Shipping", "Billing", "Confirm"]}
    footers={r("Continue --> Confirm")}
    {...props}
  >
    <Overview />
    <Shipping />
    <Billing />
    <Confirm />
  </Checkout>
);
