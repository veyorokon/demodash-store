import {
  UPDATE_CART,
  TOGGLE_CHECKOUT_DRAWER,
  UPDATE_SHIPPING_FORM,
  UPDATE_BILLING_FORM,
  UPDATE_CHECKOUT_MAX_INDEX
} from "redux/constants";

export function updateCart(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_CART, payload: payload});
  };
}

export function toggleCheckoutDrawer() {
  return function(dispatch) {
    return dispatch({type: TOGGLE_CHECKOUT_DRAWER, payload: {}});
  };
}

export function updateShippingForm(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_SHIPPING_FORM, payload: payload});
  };
}

export function updateBillingForm(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_BILLING_FORM, payload: payload});
  };
}

export function updateCheckoutMaxIndex(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_CHECKOUT_MAX_INDEX, payload: payload});
  };
}
