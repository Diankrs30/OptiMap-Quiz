import { ActionType } from "redux-promise-middleware";

const ACTION_STRING = {
  register: "REGISTER",
  login: "LOGIN",
  logout: "LOGOUT",
  getProfile: "GET_PROFILE",
  getData: "DATA_QUIZ",

  pending: `_${ActionType.Pending}`,
  fulfilled: `_${ActionType.Fulfilled}`,
  rejected: `_${ActionType.Rejected}`,
};

export default ACTION_STRING;