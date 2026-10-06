import { useCallback, useState } from "react";
// import AuthContext from "../store/auth-context";
import { useSelector } from "react-redux";

const resetAlert = {error: null, success: null};
export const apiHost = process.env.REACT_APP_API_ENDPOINT;

export default function useApi() {
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({...resetAlert});
  // const { accessToken: accessTokenData } = use(AuthContext);
  const accessToken = useSelector(store => store.auth.accessToken);

  const makeRequest = useCallback(async (request, callBack) => {
    setLoading(true);
    setAlert({...resetAlert});
    const authToken = request.accessToken || accessToken;

    let options = {
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": authToken,
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
  }, [accessToken]);

  return { isLoading, makeRequest, alert, setAlert };
};
