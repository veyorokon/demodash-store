import React from "react";
import {Flex, Text, Link} from "components";

const Footer = props => (
  <Flex
    mb={4}
    alignItems={"flex-end"}
    w={"fit-content"}
    ml={"auto"}
    mr={"auto"}
    flexGrow={0}
    {...props}
  >
    <Link target="_blank" mr={3} h="fit-content" href="https://demodash.com">
      <Text hoverColor={"#212C39"} fw={500} color="navys.2">
        &copy; demodash
      </Text>
    </Link>
    <Link
      target="_blank"
      mr={3}
      h="fit-content"
      href="https://demodash.com/legal/privacy"
    >
      <Text hoverColor={"#212C39"} fw={500} color="navys.2">
        Privacy
      </Text>
    </Link>
    <Link
      target="_blank"
      h="fit-content"
      href="https://demodash.com/legal/terms"
    >
      <Text hoverColor={"#212C39"} fw={500} color="navys.2">
        Terms
      </Text>
    </Link>
  </Flex>
);

export default Footer;
