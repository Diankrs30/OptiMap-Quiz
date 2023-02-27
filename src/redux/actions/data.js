import ACTION_STRING from "./actionStrings";
import { getData } from "../../utils/fetch";

const dataPending = () => ({
  type: ACTION_STRING.getData.concat(ACTION_STRING.pending),
});

const dataRejected = (error) => ({
  type: ACTION_STRING.getData.concat(ACTION_STRING.rejected),
  payload: { error },
});

const dataFulfilled = (data) => ({
  type: ACTION_STRING.getData.concat(ACTION_STRING.fulfilled),
  payload: { data },
});


const dataThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(dataPending());
      const result = await getData();
      dispatch(dataFulfilled(result.data));
    } catch (error) {
      dispatch(dataRejected(error));
    }
  };
};

const dataAction = {
  dataThunk,
};

export default dataAction;
