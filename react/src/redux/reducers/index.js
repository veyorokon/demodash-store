import {updateState} from "lib";
import {UPDATE_CART} from "redux/constants";

const initialState = {
  navOpen: false,
  checkoutOpen: false,
  cart: {}
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
    if (itemVariationInCart && update.amount >= 1) {
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
    }
  }

  //update amount
  return cart;
}

export default function rootReducer(state = initialState, action) {
  let newState;
  const {payload} = action;
  switch (action.type) {
    case UPDATE_CART:
      let cart = updateCart(state, payload);
      newState = updateState(state, ["cart"], cart, false);
      console.log(newState);
      return Object.assign({}, state, newState);
    default:
      return state;
  }
}
