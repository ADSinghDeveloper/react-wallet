import { useCallback, useContext, useState } from "react";
import AuthContext from "../store/auth-context";

const resetAlert = {error: null, success: null};

export default function useApi() {
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({...resetAlert});
  const { accessToken: accessTokenData } = useContext(AuthContext);
  const apiHost = process.env.REACT_APP_API_ENDPOINT;

  const makeRequest = useCallback(async (request, callBack) => {
    setLoading(true);
    setAlert({...resetAlert});

    let options = {
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": accessTokenData.token && `${accessTokenData.type} ${accessTokenData.token}`
        }
    };

    if (["post", "put", "patch", "delete"].indexOf(request.method?.toLowerCase()) >= 0) {
      options.body = JSON.stringify(request.params || {});
    }

    options.method = request.method || 'get';

    try{
      const response = await fetch(`${apiHost}${request.url}`, options);
      let errorMsg = null;

      if(response.status === 401){
        errorMsg = "Incorrect Username or Password. Please try again.";
      } else if (!response.ok) {
        errorMsg = `${response.status}: ${response.statusText}`;
      }

      const responseData = await response.json();

      if(responseData.error){
        errorMsg = responseData.error;
      }

      if(errorMsg){
        throw new Error(errorMsg);
      }else{
        callBack(responseData);
      }
      setLoading(false);

    } catch(error) {
        setLoading(false);
        setAlert({error: error.message});
      }
  }, [apiHost, accessTokenData]);

  return { isLoading, makeRequest, alert, setAlert };
};
