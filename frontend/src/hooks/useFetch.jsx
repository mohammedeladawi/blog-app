import { useEffect, useReducer } from "react";

const fetchTypes = {
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
    case fetchTypes.PENDING:
      return { ...state, loading: true, error: null };
    case fetchTypes.FULFILLED:
      return { ...state, loading: false, data: action.payload };
    case fetchTypes.REJECTED:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const useFetch = (fetchFn, deps = []) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: fetchTypes.PENDING });
      try {
        const data = await fetchFn();
        dispatch({ type: fetchTypes.FULFILLED, payload: data });
      } catch (err) {
        dispatch({ type: fetchTypes.REJECTED, payload: err?.response?.data });
      }
    };
    fetchData();
  }, deps);

  return {
    data: state.data,
    error: state.error,
    loading: state.loading,
  };
};

export default useFetch;
