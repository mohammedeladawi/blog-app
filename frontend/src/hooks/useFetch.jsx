import { useEffect } from "react";
import useApi from "./useApi";

const useFetch = (fetchFn, deps = []) => {
  const { data, loading, error, callApi } = useApi();

  useEffect(() => {
    callApi(fetchFn);
  }, deps);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
