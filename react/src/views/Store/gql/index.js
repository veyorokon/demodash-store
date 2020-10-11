import {gql} from "apollo-boost";

export const DEMODASH_STORE = gql`
  query demodashStore($handle: String!) {
    demodashStore(handle: $handle) {
      id
      description
      name
      uid
      account {
        id
        profile {
          id
          address {
            id
            line1
            line2
            country
            city
            zip
            state
          }
        }
      }
    }
  }
`;

export const BRAND_INVENTORY = gql`
  query demodashStoreInventory($demodashStoreId: Int!) {
    demodashStoreInventory(demodashStoreId: $demodashStoreId) {
      inventory {
        demoCommission {
          id
          amount
          demoBoxItem {
            id
            product {
              id
              name
              price
              shippingPrice
              description
              images {
                id
                image
                variationOption {
                  id
                  image {
                    id
                    image
                  }
                }
              }
              variations {
                id
                name
                options {
                  id
                  option
                  image {
                    id
                    image
                  }
                }
              }
            }
          }
        }
      }
      brand {
        id
        profile {
          id
          name
          logo
        }
      }
    }
  }
`;

export const BRANDS = gql`
  query demodashStoreInventory($demodashStoreId: Int!) {
    demodashStoreInventory(demodashStoreId: $demodashStoreId) {
      brand {
        id
        profile {
          id
          name
          logo
        }
      }
    }
  }
`;
