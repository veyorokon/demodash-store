import React from "react";
import {Section, Box} from "components";
import {useQuery} from "@apollo/client";
import {DEMODASH_STORE} from "views/Store/gql";
import {getDemoerHandle} from "lib";

export default WrappedComponent => {
  return () => {
    let {
      data
      // error: demodashStoreError,
      // loading: demodashStoreLoading
    } = useQuery(DEMODASH_STORE, {
      variables: {handle: getDemoerHandle()}
    });
    if (data) {
      const {demodashStore} = data;
      return (
        <Section height={"fit-content"} overflow="hidden">
          <WrappedComponent demodashStore={demodashStore} />
        </Section>
      );
    }
    return <Box>Test</Box>;
  };
};
