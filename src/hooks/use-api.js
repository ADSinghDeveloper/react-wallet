import { useCallback, useState } from "react";

import fetchApi from "../utilities/fetch-api";

const initAlert = { error: null, success: null };

export default function useApi() {
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({...initAlert});

  const makeRequest = useCallback(async (request, callBack) => {
    setLoading(true);
    setAlert({...initAlert});

    try{
      const responseData = await fetchApi({...request});
      setLoading(false);
      callBack(responseData);

    } catch(error) {
      setLoading(false);
      setAlert({error: error.message});
    }
  }, []);

  return { isLoading, makeRequest, alert, setAlert };
};
