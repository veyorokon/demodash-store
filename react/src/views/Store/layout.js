import React from "react";
import {Flex} from "components";

import {responsive as r} from "lib";
import styled from "styled-components";

const ScrollContainer = styled(Flex)`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 10px;
  }
`;

const Left = styled(ScrollContainer)`
  height: 100vh;
  justify-content: space-around;
  flex-basis: 27rem;
  overflow: auto;
  flex-grow: 10;
`;
const Right = styled(ScrollContainer)`
  flex-grow: 82;
  height: 100vh;
  flex-basis: 44rem;
  overflow: auto;
  position: relative;
  overflow-x: hidden;
`;
const Content = styled(Flex)`
  flex-direction: column;
  flex-grow: 0;
`;

export function LeftColumn(props) {
  return (
    <Left {...props}>
      <Content
        h="100%"
        justifyContent="space-between"
        alignItems="flex-start"
        w={"27rem"}
      >
        {props.children}
      </Content>
    </Left>
  );
}

export function RightColumn(props) {
  // const {selected, navOpen, checkoutOpen} = props;
  return (
    <Right
      id={"rightContainer"}
      bg={"whites.0"}
      justifyContent="flex-start"
      {...props}
    >
      <Content w={r("100%")} h={props.grow ? "100%" : "fit-content"}>
        {props.children}
      </Content>
    </Right>
  );
}
