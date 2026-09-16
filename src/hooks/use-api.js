import { useCallback, use, useState } from "react";
import AuthContext from "../store/auth-context";

const resetAlert = {error: null, success: null};

export default function useApi() {
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({...resetAlert});
  const { accessToken: accessTokenData } = use(AuthContext);
  const apiHost = process.env.REACT_APP_API_ENDPOINT;

  const makeRequest = useCallback(async (request, callBack) => {
    setLoading(true);
    setAlert({...resetAlert});

    let options = {
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": request.access_token? `${request.token_type} ${request.access_token}` : `${accessTokenData.token_type} ${accessTokenData.access_token}`,
          // "Authorization": accessTokenData.token && `${accessTokenData.type} ${accessTokenData.token}`
        }
    };

    if (["post", "put", "patch", "delete"].indexOf(request.method?.toLowerCase()) >= 0) {
      options.body = JSON.stringify(request.params || {});
    }

    options.method = request.method || 'get';

    try{
      const response = await fetch(`${apiHost}${request.url}`, options);
      let errorMsg = null;

      if(response.ok){
        const responseData = await response.json();

        // Check for server error.
        if(responseData.error){
          errorMsg = responseData.error;
        }else{
          callBack(responseData);
        }
      }else{
        if(response.status === 401){
          errorMsg = "Incorrect Username or Password. Please try again.";
        } else {
          errorMsg = `${response.status}: ${response.statusText}`;
        }
      }

      if(errorMsg){
        throw new Error(errorMsg);
      }

      setLoading(false);

    } catch(error) {
        setLoading(false);
        setAlert({error: error.message});
      }
  }, [apiHost, accessTokenData]);

  return { isLoading, makeRequest, alert, setAlert };
};
