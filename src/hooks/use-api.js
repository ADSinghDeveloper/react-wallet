import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { notificationActions } from "../store/notification";

const useApi = () => {
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({error: null, success: null});
  const accessTokenData = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();
  const apiHost = process.env.REACT_APP_API_ENDPOINT;

  const makeRequest = useCallback((requestConfig, callBack) => {
    setAlert({error: null, success: null});
    dispatch(notificationActions.close()); 
    setLoading(true);
    const requestHeaders = {
      'Authorization': requestConfig.url === 'profile'? `${requestConfig.token_type} ${requestConfig.token}` : `${accessTokenData.type} ${accessTokenData.token}`
    };
    axios({
        method: requestConfig.type,
        baseURL: apiHost, 
        url: requestConfig.url,
        data: requestConfig.params || {},
        headers: requestHeaders || {},
        withCredentials: true,
      })
      .then((response) => {
        setLoading(false);
        // console.log(response);
        if (response.status === 200) {
          if (response.data.error) {
            setAlert({error: response.data.error, success: false});
            dispatch(notificationActions.send({type: 'error', message: response.data.error}));
          }else{
            setAlert({error: false, success: response.data.success});
            dispatch(notificationActions.send({type: 'success', message: response.data.success}));
            callBack(response.data);
          }
        } else {
          setAlert({error: response, success: false});
          dispatch(notificationActions.send({type: 'error', message: response}));
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
        dispatch(notificationActions.send({type: 'error', message: errorMsg}));
      });
  }, [apiHost, accessTokenData, dispatch]);

  return { isLoading, alert, makeRequest };
};

export default useApi;
