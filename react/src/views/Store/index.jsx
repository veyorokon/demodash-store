import React from "react";
import {LeftColumn, RightColumn} from "./layout";
import {Flex, Section} from "components";
import {Products} from "./Sections";
import {responsive as r} from "lib";

export default () => {
  return (
    <Section height={"fit-content"} overflow="hidden">
      <Flex h={"100vh"}>
        <LeftColumn bg={"whites.0"} display={r("none -------> flex")}>
          <Flex w={"100%"} pt={5} pb={5} flexDirection="column">
            test
          </Flex>
        </LeftColumn>
        <RightColumn bg={"navys.4"}>
          <Products />
        </RightColumn>
      </Flex>
    </Section>
  );
};
