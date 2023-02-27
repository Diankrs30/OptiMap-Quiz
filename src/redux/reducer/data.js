import ACTION_STRING from "../actions/actionStrings";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  isFulffiled: false,
  error: null,
};

const dataReducer = (prevState = initialState, { type, payload }) => {
  const { getData, pending, rejected, fulfilled } = ACTION_STRING;
  switch (type) {
    case getData + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getData + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error.response,
      };
    case getData + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        data: payload.data.results,
      };

    default:
      return prevState;
  }
};

export default dataReducer;
