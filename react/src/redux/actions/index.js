import {UPDATE_CART, TOGGLE_CHECKOUT_DRAWER} from "redux/constants";

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
