import {UPDATE_CART} from "redux/constants";

export function updateCart(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_CART, payload: payload});
  };
}
