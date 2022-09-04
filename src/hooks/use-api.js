import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../store/notification";

const useApi = () => {
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({error: null, success: null});
  const accessTokenData = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();
  const apiHost = process.env.REACT_APP_API_ENDPOINT;

  const makeRequest = useCallback((request, callBack) => {
    setAlert({error: null, success: null});
    dispatch(notificationActions.close()); 
    setLoading(true);
    let options = {
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": request.url === 'profile'? `${request.token_type} ${request.token}` : `${accessTokenData.type} ${accessTokenData.token}`
        }
    };

    if (["post", "put", "patch", "delete"].indexOf(request.method?.toLowerCase()) >= 0) {
      options.body = JSON.stringify(request.params || {});
    }

    options.method = request.method || 'get';

    fetch(`${apiHost}${request.url}`, options)
    .then(response => {
      setLoading(false);
      // console.log('1',response);
      if (response.ok) {
        return response.json();
      }

      setAlert({error: `${response.status}: ${response.statusText}`, success: false});
      dispatch(notificationActions.send({type: 'error', message: `${response.status}: ${response.statusText}`}));
      // throw Error(response.statusText)
    })
      .then((response) => {
        setLoading(false);
        // console.log('2',response);
        if(response !== undefined){
          if (response?.status === 'error') {
            setAlert({error: response.message, success: false});
            dispatch(notificationActions.send({type: 'error', message: response.message}));
          }else{
            setAlert({error: false, success: response.success});
            dispatch(notificationActions.send({type: 'success', message: response.success}));
            callBack(response);
          }
        } else {
          setAlert({error: 'No Response.', success: false});
          dispatch(notificationActions.send({type: 'error', message: 'No Response.'}));
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
