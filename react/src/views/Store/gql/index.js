import {gql} from "apollo-boost";

export const DEMODASH_STORE = gql`
  query demodashStore($handle: String!) {
    demodashStore(handle: $handle) {
      id
      description
      name
      uid
      demoerInventory {
        id
        demoCampaign {
          id
          demoBox {
            id
            name
          }
          account {
            id
            profile {
              id
              name
            }
          }
        }
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
  }
`;
