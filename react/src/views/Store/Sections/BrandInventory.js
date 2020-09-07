import React from "react";
import {Flex, Box, Text} from "components";
import {Query} from "@apollo/react-components";
import {ImageCard} from "views/Store/Components";
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
        const brandInventory = demodashStoreInventory[0];
        const product =
          brandInventory.inventory[0].demoCommission.demoBoxItem.product;
        return (
          <Flex w="100%" {...props}>
            <Box mt={3} w="100%" maxWidth="100%" br={"4px"}>
              <Text mb={4} fs={3}>
                {brandInventory.brand.profile.name}
              </Text>
              <ImageCard
                key={product.id}
                ml={"auto"}
                mr={"auto"}
                brand={
                  (brandInventory.brand && brandInventory.brand.profile.name) ||
                  null
                }
                productId={product.id}
                title={product.name}
                description={product.description}
                images={product.images}
                variations={product.variations}
                price={product.price}
                shippingPrice={product.shippingPrice}
              />
            </Box>
          </Flex>
        );
      }}
    </Query>
  );
};
export default Brands;
