import ACTION_STRING from "../actions/actionStrings";

const initialState = {
  userData: {
    id: null,
    token: null,
  },
  profile: {
    id: null,
    email: null,
  },
  isLoading: false,
  isError: false,
  isFulffiled: false,
  error: null,
};

const authReducer = (prevState = initialState, { type, payload }) => {
  const { register, login, logout, getProfile, pending, rejected, fulfilled } =
    ACTION_STRING;
  switch (type) {
    case register + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case register + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error.response.data.status,
      };
    case register + fulfilled:
      return {
        ...prevState,
        isLoading: false,
      };

    case login + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case login + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error.response.data.status,
      };
    case login + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        userData: {
          id: payload.data.data.id,
          token: payload.data.data.token,
        },
      };

    case logout + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case logout + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error,
      };
    case logout + fulfilled:
      return initialState;

    case getProfile + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getProfile + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error.response,
      };
    case getProfile + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        profile: {
          id: payload.data.data.id,
          email: payload.data.data.email,
          name: payload.data.data.name
        },
      };

    default:
      return prevState;
  }
};

export default authReducer;
