import ACTION_STRING from "./actionStrings";
import { login, register, logout, getProfile } from "../../utils/fetch";

const registerPending = () => ({
  type: ACTION_STRING.register.concat(ACTION_STRING.pending),
});

const registerRejected = (error) => ({
  type: ACTION_STRING.register.concat(ACTION_STRING.rejected),
  payload: { error },
});

const registerFulfilled = (data) => ({
  type: ACTION_STRING.register.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const loginPending = () => ({
  type: ACTION_STRING.login.concat(ACTION_STRING.pending),
});

const loginRejected = (error) => ({
  type: ACTION_STRING.login.concat(ACTION_STRING.rejected),
  payload: { error },
});

const loginFulfilled = (data) => ({
  type: ACTION_STRING.login.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const logoutPending = () => ({
  type: ACTION_STRING.logout.concat(ACTION_STRING.pending),
});

const logoutRejected = (error) => ({
  type: ACTION_STRING.logout.concat(ACTION_STRING.rejected),
  payload: { error },
});

const logoutFulfilled = (data) => ({
  type: ACTION_STRING.logout.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const getProfilePending = () => ({
  type: ACTION_STRING.getProfile.concat(ACTION_STRING.pending),
})

const getProfileRejected = (error) => ({
  type: ACTION_STRING.getProfile.concat(ACTION_STRING.rejected),
  payload: { error },
});

const getProfileFulfilled = (data) => ({
  type: ACTION_STRING.getProfile.concat(ACTION_STRING.fulfilled),
  payload: { data },
});


const registerThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(registerPending());
      const result = await register(body);
      dispatch(registerFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess();
    } catch (error) {
      dispatch(registerRejected(error));
      if (typeof cbDenied === "function") cbDenied(error);
    }
  };
};

const loginThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(loginPending());
      const result = await login(body);
      dispatch(loginFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess(result.data);
    } catch (error) {
      dispatch(loginRejected(error));
      if (typeof cbDenied === "function") cbDenied(error);
    }
  };
};

const logoutThunk = (token, cbSuccess) => {
  return async (dispatch) => {
    try {
      dispatch(logoutPending());
      const result = await logout(token);
      dispatch(logoutFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess(result.data);
    } catch (error) {
      dispatch(logoutRejected(error));
    }
  };
};

const getProfileThunk = (token) => {
  return async (dispatch) => {
    try {
      dispatch(getProfilePending());
      const result = await getProfile(token);
      dispatch(getProfileFulfilled(result.data));
    } catch (error) {
      dispatch(getProfileRejected(error));
    }
  };
};

const authAction = {
  registerThunk,
  loginThunk,
  logoutThunk,
  getProfileThunk
};

export default authAction;
