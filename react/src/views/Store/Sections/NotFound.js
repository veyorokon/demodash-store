import React from "react";
import {Flex, Text} from "components";
import NotFound from "assets/icons/NotFound";
import Footer from "./Footer"; //Prob needs to be somewhere outside 'Sections'
import {responsive as r} from "lib";

function Success(props) {
  return (
    <>
      <Flex
        p={2}
        pt={4}
        pb={4}
        flexDirection="column"
        h={"100%"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex p={3} flexGrow={0} flexDirection="column" alignItems="center">
          <Text textAlign="center" mt={2} fs={"2.4rem"} fw={600}>
            Store not found...
          </Text>
          <Text
            textAlign="center"
            color="navys.0"
            mt={3}
            fs={r("1.8rem ---> 2rem")}
          >
            Sorry, but we couldn't find the demodash store you were looking for.
          </Text>
        </Flex>
        <Flex p={3} alignItems="center" h={"50rem"} w={"auto"}>
          <NotFound />
        </Flex>
        <Text
          textAlign="center"
          color="navys.0"
          mb={5}
          fs={r("1.8rem ---> 2rem")}
        >
          Check the url, there may be a typo.
        </Text>
      </Flex>
      <Footer />
    </>
  );
}

export default Success;
