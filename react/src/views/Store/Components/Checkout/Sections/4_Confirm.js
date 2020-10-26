import React from "react";
import {Flex, Text, Span} from "components";
import {connect} from "react-redux";
import {mapStateToProps, responsive as r} from "lib";

// function FlexRow(props) {
//   return (
//     <Flex
//       flexGrow={0}
//       flexDirection={r("column --> row")}
//       justifyContent="space-between"
//       {...props}
//     >
//       {props.children}
//     </Flex>
//   );
// }

function _Form(props) {
  const {cart} = props;
  console.log(cart);
  return (
    <Flex
      transition="max-width 0.3s"
      maxWidth={r("100% -----> 60rem")}
      flexDirection="column"
    >
      <Span mt={2} borderBottom="1px solid #e3e3ee" w="100%" />
      <Text>Test</Text>
    </Flex>
  );
}

const Form = connect(
  state => mapStateToProps(state, ["cart"]),
  null
)(_Form);

function Confirm(props) {
  return (
    <Flex
      pl={r("2 3 -> 4 5")}
      pr={r("2 3 -> 4 5")}
      w={"100%"}
      h={"100%"}
      justifyContent="center"
      transition="padding 0.3s"
    >
      <Form />
    </Flex>
  );
}

export default Confirm;
