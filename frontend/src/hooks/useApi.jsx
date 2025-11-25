import { useCallback, useReducer } from "react";

const actionTypes = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.PENDING:
      return { ...state, loading: true, error: null };
    case actionTypes.FULFILLED:
      return { ...state, loading: false, data: action.payload };
    case actionTypes.REJECTED:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
const useApi = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const callApi = useCallback(
    async (callback) => {
      if (state.loading) return;

      dispatch({ type: actionTypes.PENDING });
      try {
        const data = await callback();
        dispatch({ type: actionTypes.FULFILLED, payload: data });
      } catch (err) {
        dispatch({
          type: actionTypes.REJECTED,
          payload:
            err?.response?.data || err?.message || "Something went wrong",
        });
      }
    },
    [state.loading]
  );

  return {
    ...state,
    callApi,
  };
};

export default useApi;
