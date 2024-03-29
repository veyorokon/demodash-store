import React from "react";
import {Flex, Box, Text} from "components";
import {Query} from "@apollo/client/react/components";
import {ImageCard} from "views/Store/Components";
import {responsive as r} from "lib";
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
        return (
          <Flex flexDirection="column" w="100%" {...props}>
            {demodashStoreInventory.length ? (
              demodashStoreInventory.map(brandInventory => (
                <Box
                  key={"brand_" + brandInventory.brand.id}
                  mt={3}
                  w="100%"
                  maxWidth="100%"
                  br={"4px"}
                >
                  <Text mb={4} fs={3}>
                    {brandInventory.brand.profile.name}
                  </Text>
                  <Flex justifyContent="space-evenly" flexWrap="wrap">
                    {brandInventory.inventory.length ? (
                      brandInventory.inventory.map((inventory, index) => {
                        const product =
                          inventory.demoCommission.demoBoxItem.product;
                        return (
                          <ImageCard
                            key={`${brandInventory.brand}_${index}`}
                            demoCommission={inventory.demoCommission}
                            product={product}
                            brandId={parseInt(brandInventory.brand.id)}
                            brandIcon={brandInventory.brand.profile.logo}
                            brand={
                              (brandInventory.brand &&
                                brandInventory.brand.profile.name) ||
                              null
                            }
                            productId={product.id}
                            title={product.name}
                            description={product.description}
                            images={product.images}
                            variations={product.variations}
                            price={product.price}
                            shippingPrice={product.shippingPrice}
                            maxWidth={r("unset --> 33rem ----> 30rem 33rem")}
                            minWidth={r("unset --> 33rem ----> 30rem 33rem")}
                          />
                        );
                      })
                    ) : (
                      <Text color={"black"}>
                        No {brandInventory.brand.profile.name} products yet...
                      </Text>
                    )}
                  </Flex>
                </Box>
              ))
            ) : (
              <Text color={"black"}>No brands yet...</Text>
            )}
          </Flex>
        );
      }}
    </Query>
  );
};
export default Brands;
