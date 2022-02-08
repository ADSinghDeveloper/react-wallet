import { createSlice } from "@reduxjs/toolkit";

import useApi from "../hooks/use-api";

const initialState = {
  isLoggedIn: null,
  accessToken: { token: "", type: "" },
  authUser: { name: "" },
  signUp: false,
  profile: false,
};

const rwamKey = "rwam";

window.addEventListener("beforeunload", (e) => {
  if (window.hasOwnProperty("rwam")) {
    localStorage.setItem(rwamKey, JSON.stringify(window.rwam));
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState, // JS short-code of initialState : initialState,
  reducers: {
    setLoggedInData: (state, action) => {
      state.isLoggedIn = true;
      state.signUp = false;
      state.authUser = action.payload.user;
      state.accessToken = {
        token: action.payload.access_token,
        type: action.payload.token_type,
      };
      window.rwam = state.accessToken;
    },
    updateAuthUser: (state, action) => {
      state.authUser = action.payload.user;
    },
    logout: (state) => {
      delete window.rwam;
      return { ...initialState, isLoggedIn: false };
    },
    notLogged: (state) => {
      state.isLoggedIn = false;
    },
    toRegister: (state) => {
      state.signUp = true;
    },
    toLogin: (state) => {
      state.signUp = false;
    },
    toProfile: (state) => {
      state.profile = true;
    },
    toDashboard: (state) => {
      state.profile = false;
    },
  },
});

export const authActions = authSlice.actions;

export const getAuthProfile = () => {
  return (dispatch) => {
    const authKey = JSON.parse(localStorage.getItem(rwamKey));

    if (authKey != null) {
      // typeof authKey === 'object'
      const { makeRequest: authProfileRequest } = useApi();
      localStorage.removeItem(rwamKey);

      authProfileRequest(
        { url: "profile", token: authKey.token, token_type: authKey.type },
        (response) => {
          if (typeof response === "object") {
            dispatch(
              authActions.setLoggedInData({
                user: response,
                access_token: authKey.token,
                token_type: authKey.type,
              })
            );
          } else {
            console.error("Auth Profile Error.");
          }
        }
      );
    } else {
      dispatch(authActions.notLogged());
    }
  };
};

export default authSlice.reducer;
