import { QueryClient } from "@tanstack/react-query";
import { apiHost, getLocalAuthKey, isObject, setLocalAuthKey } from "./helper";

const methodTypes = ["post", "put", "patch", "delete"];
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json;charset=UTF-8",
  "Authorization": null,
}

export function setAuthToken (token = null) {
  headers.Authorization = token;
}

export function getAuthToken () {
  return headers.Authorization;
}

export function hasAuthToken () {
  return !!headers.Authorization;
}

export function setAuthTokenToApiHeader () {
  // Set access to localstorage before reload.
  window.addEventListener("beforeunload", (event) => {
    let accessToken =  getAuthToken();
    accessToken && setLocalAuthKey(accessToken);
  });

  // Set access to app API header after app load.
  const localAuthKey = getLocalAuthKey();
  localAuthKey && setAuthToken(localAuthKey);
}

export const queryClient = new QueryClient();

export default async function fetchApi ({url, method, body, signal, isTokenBased}) {
  method = method?.toLowerCase() ?? (isObject(body)? "post" : null);

  let options = { headers }

  if(method) options.method = method;
  if(signal) options.signal = signal;

  if(isTokenBased && !hasAuthToken()){
    console.warn(`Access token not found for '${url}' request.`);
    return null;
  }

  // To send user data.
  if (isObject(body) && (method && methodTypes.includes(method))) {
    options.body = JSON.stringify(body || {});
  }

  const response = await fetch(`${apiHost}${url}`, options);
  let errorMsg = null;

  if(response.ok){
    const responseData = await response.json();

    // Check for server error.
    if(responseData.error){
      errorMsg = responseData.error;
    }else{
      return responseData;
    }
  }else{
    if(response.status === 401){
      errorMsg = "Incorrect Username or Password. Please try again.";
    } else {
      errorMsg = `${response.status}: ${response.statusText}`;
    }
  }

  if(errorMsg){
    const error = Error(errorMsg);
    error.status = response.status;
    error.code = response.status;
    throw error;
  }
}
