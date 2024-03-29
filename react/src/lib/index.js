/*
    Author: Vahid Eyorokon

    Utility functions and commonly used fields
*/

/*
    Imports
*/

import updateState from "./updateState";
import responsive from "./responsive";
import {
  validateEmail,
  validatePassword,
  clearToken,
  getToken,
  setToken,
  getEventVal,
  validateToken,
  formatErrorMessage,
  formatGQLErrorMessage,
  getDemoerHandle,
  getAnchor,
  isEmpty
} from "./utility";
import {STATES} from "./constants";
import {mapStateToProps} from "./redux";

export {
  updateState,
  responsive,
  validateEmail,
  validatePassword,
  clearToken,
  getToken,
  setToken,
  getEventVal,
  validateToken,
  formatErrorMessage,
  formatGQLErrorMessage,
  getDemoerHandle,
  getAnchor,
  mapStateToProps,
  isEmpty,
  STATES
};
