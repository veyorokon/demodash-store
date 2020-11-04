import {updateState} from "lib";
import {
  UPDATE_CART,
  TOGGLE_CHECKOUT_DRAWER,
  UPDATE_SHIPPING_FORM,
  UPDATE_BILLING_FORM,
  UPDATE_CHECKOUT_MAX_INDEX,
  SET_CHECKOUT_SUCCESSFUL,
  SET_CHECKOUT_INDEX,
  CLEAR_CART
} from "redux/constants";

const initialState = {
  navOpen: false,
  cart: {},
  shippingForm: {country: "US"},
  billingForm: {},
  checkoutDrawerOpen: false,
  checkoutIndex: 0,
  checkoutMaxIndex: 1,
  checkoutSuccessful: false
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
    case UPDATE_CHECKOUT_MAX_INDEX:
      const {checkoutMaxIndex} = payload;
      return updateState(state, ["checkoutMaxIndex"], checkoutMaxIndex, true);
    case SET_CHECKOUT_SUCCESSFUL:
      const {checkoutSuccessful} = payload;
      return updateState(
        state,
        ["checkoutSuccessful"],
        checkoutSuccessful,
        true
      );
    case SET_CHECKOUT_INDEX:
      const {checkoutIndex} = payload;
      return updateState(state, ["checkoutIndex"], checkoutIndex, true);
    case CLEAR_CART:
      newState = updateState(state, ["cart"], {}, false);
      newState = updateState(
        newState,
        ["shippingForm"],
        {country: "US"},
        false
      );
      newState = updateState(newState, ["billingForm"], {}, false);
      newState = updateState(newState, ["checkoutMaxIndex"], 1, false);
      newState = updateState(newState, ["checkoutIndex"], 0, false);
      return Object.assign({}, state, newState);
    default:
      return state;
  }
}
