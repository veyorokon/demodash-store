import React from "react";
import {Flex, Box, Text} from "components";
import {Query} from "@apollo/react-components";

import {BRAND_INVENTORY} from "views/Store/gql";

const Brands = props => {
  // const {demodashStore} = props;
  return (
    <Query
      query={BRAND_INVENTORY}
      variables={{
        demodashStoreId: props.demodashStoreId
      }}
      // pollInterval={1000}
    >
      {({loading, error, data}) => {
        if (loading)
          return (
            <Box h="3.5rem" mb={4}>
              <Text>Loading...</Text>
            </Box>
          );
        if (error)
          return (
            <Box h="3.5rem" mb={4}>
              <Text>HERE</Text>
              <Text>Error! {error.message}</Text>
            </Box>
          );

        const {demodashStoreInventory} = data;
        console.log(demodashStoreInventory);
        const inventory = demodashStoreInventory[0];
        return (
          <Flex>
            <Box mt={3} maxWidth="100%" br={"4px"}>
              <Text fs={3}>{inventory.brand.profile.name}</Text>
            </Box>
          </Flex>
        );
      }}
    </Query>
  );
};
export default Brands;
