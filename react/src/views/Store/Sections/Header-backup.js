import React from "react";
import {Box, Text} from "components";
import {responsive as r} from "lib";

const Header = props => {
  const {demodashStore} = props;
  const {address} = demodashStore.account.profile;
  return (
    <Box>
      <Text mb={2} h="fit-content" as="h1" fs={4} fw={r("600")} color="navys.0">
        {demodashStore.name}
      </Text>
      <Text h="fit-content" as="h2" fw={r("400")} fs={"1.4rem"} color="navys.0">
        {address.line1} {address.line2}, {address.city} {address.state},{" "}
        {address.zip}
      </Text>
    </Box>
  );
};
export default Header;
