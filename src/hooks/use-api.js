import { useCallback, useState } from "react";
import axios from "axios";

const useApi = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiHost = "http://wallet2.ads/api/";
  // const apiHost = "http://localhost:8000/";
  // axios.defaults.withCredentials = true;

  const makeRequest = useCallback((requestConfig, callBack) => {
    setLoading(true);
    console.log(requestConfig);
    let requestService;
    if (requestConfig.url === "login") {
      requestService = axios.post(
        `${apiHost}${requestConfig.url}`,
        requestConfig.params || {}
      );
    } else if (requestConfig.type === "post") {
      requestService = axios.post(
        `${apiHost}${requestConfig.url}`,
        requestConfig.params || {},
        {headers: requestConfig.headers || {}}
      );
    } else {
      requestService = axios.get(
        `${apiHost}${requestConfig.url}`,
        requestConfig.params || {},
        {headers: requestConfig.headers || {}}
      );
    }

    requestService
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.status === 200) {
          callBack(response.data);
        } else {
          setError({
            title: "Response Error",
            message: response,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        let errorCode = '';
        let errorTitle = '';
        let errorMsg = '';
        console.log(error);
        if(error.hasOwnProperty("response") && error.response !== undefined){
          errorCode = error.response.status;
          errorTitle = error.response.statusText;
          errorMsg = error.response.data.message;
        }else{
          errorTitle = 'Error: Someting went wrong';
          errorMsg = 'Could be a network error.';
        }
        setError({
          code: errorCode,
          title: errorTitle,
          message: errorMsg,
        });
      });
  }, [apiHost]);

  return { isLoading, error, makeRequest };
};

export default useApi;
