import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const useApi = () => {
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({error: null, success: null});
  const accessTokenData = useSelector(state => state.auth.accessToken);
  const apiHost = "http://wallet2.ads/api/";
  // const apiHost = "http://localhost:8000/";
  // axios.defaults.withCredentials = true;

  const makeRequest = useCallback((requestConfig, callBack) => {
    setAlert({error: null, success: null});
    setLoading(true);
    const requestHeaders = {
      'Authorization': `${accessTokenData.type} ${accessTokenData.token}`
    };
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
        {headers: requestHeaders || {}}
      );
    } else {
      requestService = axios.get(
        `${apiHost}${requestConfig.url}`,
        {headers: requestHeaders}
      );
    }

    requestService
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.status === 200) {
          if (response.data.error) {
            setAlert({error: response.data.error, success: false});
          }else{
            setAlert({error: false, success: response.data.success});
            callBack(response.data);
          }
        } else {
          setAlert({error: response, success: false});
        }
      })
      .catch((error) => {
        setLoading(false);
        let errorMsg = '';
        console.log(error);
        if(error.hasOwnProperty("response") && error.response !== undefined){
          errorMsg = (error.response.status === 401) ? "Username/Password mismatched." : `${error.response.statusText}: ${error.response.data.message}`;
        }else{
          errorMsg = 'Someting went wrong or could be a network error.';
        }
        setAlert({error: errorMsg, success: false});
      });
  }, [apiHost, accessTokenData]);

  return { isLoading, alert, makeRequest };
};

export default useApi;
