import React from "react";
import {Flex} from "components";
import {connect} from "react-redux";
import {responsive as r} from "lib";

function _Shipping(props) {
  return (
    <Flex
      pl={r("2 ---> 4")}
      pr={r("2 ---> 4")}
      w={"100%"}
      h={"100%"}
      justifyContent="center"
      transition="padding 0.3s"
    >
      <Flex
        transition="max-width 0.3s"
        maxWidth={r("100% -----> 60rem")}
        flexDirection="column"
      >
        Test
      </Flex>
    </Flex>
  );
}

const Shipping = connect(
  null,
  null
)(_Shipping);

export default Shipping;
