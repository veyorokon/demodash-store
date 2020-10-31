import React from "react";
import {Flex, Input} from "components";

export function FormInput(props) {
  return <Input p={2} h={"3.5rem"} flexGrow={0} {...props} />;
}

export function FlexRow(props) {
  return (
    <Flex flexGrow={0} justifyContent="space-between" {...props}>
      {props.children}
    </Flex>
  );
}
