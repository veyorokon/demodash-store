import React from "react";
import {Section} from "components";
import {NotFound, Loading} from "./Sections";
import {useQuery} from "@apollo/client";
import {DEMODASH_STORE} from "views/Store/gql";
import {getDemoerHandle} from "lib";

export default WrappedComponent => {
  return () => {
    let {data, loading: demodashStoreLoading} = useQuery(DEMODASH_STORE, {
      variables: {handle: getDemoerHandle()}
    });
    if (demodashStoreLoading) return <Loading />;
    if (data) {
      const {demodashStore} = data;
      return (
        <Section height={"fit-content"} overflow="hidden">
          <WrappedComponent demodashStore={demodashStore} />
        </Section>
      );
    }
    return <NotFound />;
  };
};
