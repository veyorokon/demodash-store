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

export const DEMODASH_STORE_INVENTORY = gql`
  query demodashStoreInventory($demodashStoreId: Int!) {
    demodashStoreInventory(demodashStoreId: $demodashStoreId) {
      id
      demoCommission {
        id
        amount
        demoBoxItem {
          id
          product {
            id
            name
            price
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
  }
`;
