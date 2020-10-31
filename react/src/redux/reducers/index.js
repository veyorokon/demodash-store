import {updateState} from "lib";
import {
  UPDATE_CART,
  TOGGLE_CHECKOUT_DRAWER,
  UPDATE_SHIPPING_FORM,
  UPDATE_BILLING_FORM
} from "redux/constants";

const PRODUCT_ONE = {
  "31": {
    "11-16-7-35-8-38": {
      product: {
        id: "11",
        name: "Hair Filling Fibers",
        price: 25,
        shippingPrice: 2,
        description: "Add density to thinning hair.",
        images: [
          {
            id: "41",
            image: "account_31/products/account_31/products/bromane-brand.jpg",
            variationOption: null
          },
          {
            id: "43",
            image: "account_31/products/account_31/products/medium-blonde.jpg",
            variationOption: {
              id: "35",
              image: [
                {
                  id: "43",
                  image:
                    "account_31/products/account_31/products/medium-blonde.jpg"
                }
              ]
            }
          }
        ],
        variations: [
          {
            id: "7",
            name: "Color",
            options: [
              {
                id: "31",
                option: "Black",
                image: []
              },
              {
                id: "32",
                option: "Dark Brown",
                image: []
              },
              {
                id: "33",
                option: "Medium Brown",
                image: []
              },
              {
                id: "34",
                option: "Light Brown",
                image: []
              },
              {
                id: "35",
                option: "Blonde",
                image: [
                  {
                    id: "43",
                    image:
                      "account_31/products/account_31/products/medium-blonde.jpg"
                  }
                ]
              }
            ]
          },
          {
            id: "8",
            name: "Size",
            options: [
              {
                id: "36",
                option: "Small",
                image: []
              },
              {
                id: "37",
                option: "Medium",
                image: []
              },
              {
                id: "38",
                option: "Large",
                image: []
              }
            ]
          }
        ]
      },
      amount: 1,
      variationsChosen: {
        "7": 35,
        "8": 38
      }
    }
  }
};

const initialState = {
  navOpen: false,
  checkoutDrawerOpen: true,
  cart: {...PRODUCT_ONE},
  shippingForm: {
    name: "",
    addressLine1: "123 test street",
    state: "OH",
    city: "New Town",
    zip: "12345",
    email: "some@email.com"
  },
  billingForm: {
    cardNumber: "4242424242424242",
    expMonth: "12",
    expYear: "2022",
    cvc: "123"
  }
};

function sortKeys(dict) {
  var keys = Object.keys(dict); // or loop over the object to get the array
  return keys.sort(); // maybe use custom sort, to change direction use
}

function getItemToken(productId, demoCommissionId) {
  return `${productId}-${demoCommissionId}`;
}

function getVariationToken(variationsChosen) {
  if (!variationsChosen) return null;
  //iter over all variations chosen in order of key
  let token = "";
  let sortedKeys = sortKeys(variationsChosen);
  for (let i = 0; i < sortedKeys.length; i++) {
    // now lets iterate in sort order
    let key = sortedKeys[i];
    let value = variationsChosen[key];
    //Removes the trailing -
    token += `${key}-${value}-`;
  }
  return token.substring(0, token.length - 1);
}

function getBrandItemCheckoutToken(payload) {
  const {update} = payload;
  let itemToken = getItemToken(payload.productId, payload.demoCommissionId);
  let variationToken = getVariationToken(update.variationsChosen);
  let token = `${itemToken}-${variationToken}`;
  if (!variationToken) return token.substring(0, token.length - 1);
  return token;
}

function addBrandToCart(state, payload) {
  const {update} = payload;
  let itemCheckoutToken = getBrandItemCheckoutToken(payload);
  return {
    ...state.cart,
    [payload.brandId]: {
      [itemCheckoutToken]: {
        ...update,
        amount: update.amount
      }
    }
  };
}

function updateCart(state, payload) {
  let cart;
  const {update} = payload;
  let itemCheckoutToken = getBrandItemCheckoutToken(payload);
  let brandIsInCart = state.cart[payload.brandId];

  if (!brandIsInCart) {
    //check if brandId doesnt exists
    cart = addBrandToCart(state, payload);
  } else {
    let itemVariationInCart = state.cart[payload.brandId][itemCheckoutToken];

    if (!itemVariationInCart && update.amount >= 1)
      cart = {
        ...state.cart,
        [payload.brandId]: {
          ...state.cart[payload.brandId],
          [itemCheckoutToken]: {
            ...update,
            amount: update.amount
          }
        }
      };
    else if (itemVariationInCart && update.amount >= 1) {
      let prevAmount = itemVariationInCart.amount;
      cart = {
        ...state.cart,
        [payload.brandId]: {
          ...state.cart[payload.brandId],
          [itemCheckoutToken]: {
            ...update,
            amount: prevAmount + update.amount
          }
        }
      };
    } else {
      //Handle deleting item
      try {
        //HACKY NEEDS TO BE FIXED
        let prevAmount = itemVariationInCart.amount;
        if (prevAmount + update.amount > 0) {
          cart = {
            ...state.cart,
            [payload.brandId]: {
              ...state.cart[payload.brandId],
              [itemCheckoutToken]: {
                ...update,
                amount: prevAmount + update.amount
              }
            }
          };
        } else {
          cart = {
            ...state.cart,
            [payload.brandId]: {
              ...state.cart[payload.brandId]
            }
          };
          delete cart[payload.brandId][itemCheckoutToken];
        }
      } catch {}
    }
  }
  return cart;
}

export default function rootReducer(state = initialState, action) {
  let newState;
  const {payload} = action;
  switch (action.type) {
    case TOGGLE_CHECKOUT_DRAWER:
      return updateState(
        state,
        ["checkoutDrawerOpen"],
        !state.checkoutDrawerOpen
      );
    case UPDATE_CART:
      let cart = updateCart(state, payload);
      newState = updateState(state, ["cart"], cart, false);
      return Object.assign({}, state, newState);
    case UPDATE_SHIPPING_FORM:
      return updateState(state, ["shippingForm"], payload, true);
    case UPDATE_BILLING_FORM:
      return updateState(state, ["billingForm"], payload, true);
    default:
      return state;
  }
}
