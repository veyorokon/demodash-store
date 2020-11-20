import {updateState, isEmpty} from "lib";
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
  let keys = Object.keys({...dict}); // or loop over the object to get the array
  return keys.sort(); // maybe use custom sort, to change direction use
}

function getVariationToken(variationsChosen) {
  if (isEmpty(variationsChosen)) return "";
  //iter over all variations chosen in order of key
  let token = "";
  let sortedKeys = sortKeys(variationsChosen);
  for (let i = 0; i < sortedKeys.length; i++) {
    // now lets iterate in sort order
    let key = sortedKeys[i];
    let value = variationsChosen[key];
    token += `${key}-${value}-`;
  }
  //Removes the trailing -
  return token.substring(0, token.length - 1);
}

function getItemCheckoutToken(payload) {
  const {update, brandId, productId, demoCommissionId} = payload;
  let variationToken = getVariationToken({...update.variationsChosen});
  let token = `${brandId}-${demoCommissionId}-${productId}-${variationToken}`;
  if (!variationToken) return token.substring(0, token.length - 1);
  return token;
}

function updateCart(cart, payload) {
  const update = {...payload.update};
  let itemCheckoutToken;
  itemCheckoutToken = getItemCheckoutToken(payload);
  let prevAmount = 0;
  if (itemCheckoutToken in cart) prevAmount = cart[itemCheckoutToken].amount;
  if (prevAmount + update.amount > 0) {
    cart = {
      ...cart,
      [itemCheckoutToken]: {
        ...update,
        amount: prevAmount + update.amount,
        variationsChosen: {...update.variationsChosen},
        token: itemCheckoutToken
      }
    };
  } else delete cart[itemCheckoutToken];
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
      let cart = updateCart(state.cart, payload);
      return updateState(state, ["cart"], {...cart}, true);
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
