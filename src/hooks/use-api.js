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

      if(response.status === 401){
        setAlert({error: "Username or Password is wrong. Please check and try again."});
      } else if (!response.ok) {
        setAlert({error: `${response.status}: ${response.statusText}`});
      }

      const responseData = await response.json();
      callBack(responseData);
      setLoading(false);

    } catch(error) {
        console.log("catch", error);
        setLoading(false);
        let errorMsg = '';
        if(error.hasOwnProperty("response") && error.response !== undefined){
          errorMsg = (error.response.status === 401) ? "Username/Password mismatched." : `${error.response.statusText}: ${error.response.data.message}`;
        }else{
          errorMsg = 'Username or Password is wrong. Please check and try again.';
        }
        setAlert({error: errorMsg});
      }
  }, [apiHost, accessTokenData]);

  return { isLoading, alert, makeRequest };
};
