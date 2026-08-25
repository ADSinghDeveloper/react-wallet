import { createSlice } from "@reduxjs/toolkit";
import { delBrowserAuthKey, setBrowserAuthKey } from "../helper/helper";

const initialState = {
  isLoggedIn: null,
  isRootUser: null,
  isAppLoaded: false,
  accessToken: { token: "", type: "" },
  authUser: { name: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState, // JS short-code of initialState : initialState,
  reducers: {
    setLoggedInData: (state, action) => {
      state.isLoggedIn = true;
      state.authUser = action.payload.user;
      state.isRootUser = action.payload.user.id === 1;
      state.accessToken = {
        token: action.payload.access_token,
        type: action.payload.token_type,
      };
      if(action.appLoaded){
        state.isAppLoaded = true;
      }
      setBrowserAuthKey(state.accessToken);
    },
    updateAuthUser: (state, action) => {
      state.authUser = action.payload.user;
    },
    logout: () => {
      delBrowserAuthKey();
      return { ...initialState, isLoggedIn: false, isRootUser: false };
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
