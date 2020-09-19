// import {updateState} from "lib";
import {UPDATE_CART} from "redux/constants";

const initialState = {
  navOpen: false,
  checkoutOpen: false
};

export default function rootReducer(state = initialState, action) {
  const {payload} = action;
  // let newState, accountUser, isMutualPanel, data;
  switch (action.type) {
    case UPDATE_CART:
      console.log(payload);
      return state;
    default:
      return state;
  }
}
