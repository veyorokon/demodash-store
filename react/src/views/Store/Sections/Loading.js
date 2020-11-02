import React from "react";
import {Flex} from "components";
import Skeleton from "react-loading-skeleton";
import Footer from "./Footer"; //Prob needs to be somewhere outside 'Sections'
import {responsive as r} from "lib";

function Success(props) {
  return (
    <Flex bg="blues.3" flexDirection="column" h={"100vh"} pt={3}>
      <Flex>
        <Flex display={r("none -----> flex")} flexGrow={0}>
          <Flex
            bg="whites.0"
            p={4}
            h={"100%"}
            w="fit-content"
            flexGrow={0}
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <Skeleton width={300} height={50} />
            <Skeleton width={300} height={50} />
            <Skeleton width={300} height={50} />
            <Skeleton width={300} height={50} />
            <Skeleton width={300} height={50} />
          </Flex>
        </Flex>
        <Flex maxWidth="80rem" ml="auto" mr="auto" p={r("3 ---> 4")}>
          <Flex
            h={"100%"}
            w="100%"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <Skeleton w={400} height={400} />
            <Skeleton w={400} height={30} />
            <Skeleton w={400} height={30} />
            <Skeleton w={400} height={50} />
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
}

export default Success;
