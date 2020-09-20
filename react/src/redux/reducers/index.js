// import {updateState} from "lib";
import {UPDATE_CART} from "redux/constants";

const initialState = {
  navOpen: false,
  checkoutOpen: false,
  cart: {}
};

export default function rootReducer(state = initialState, action) {
  const {payload} = action;
  switch (action.type) {
    case UPDATE_CART:
      console.log(payload);
      let itemToken = `${payload.productId}-${payload.demoCommissionId}`;
      let cart = {
        [payload.brandId]: {
          [itemToken]: {}
        }
      };
      console.log(cart);
      return state;
    default:
      return state;
  }
}
