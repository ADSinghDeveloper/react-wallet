import { createSlice } from "@reduxjs/toolkit";
import { delBrowserAuthKey, setBrowserAuthKey } from "../utilities/helper";

const initialAuthState = {
  isLoggedIn: null,
  isRootUser: null,
  accessToken: { access_token: "", token_type: "" },
  authUser: { name: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState, // Can also use JS short-code of initialState : initialState,
  reducers: {
    setLoggedInData: (state, action) => {
      // We can immutate state object here in redux toolkit because it handles immutated object internally.
      state.isLoggedIn = true;
      state.authUser = {...action.payload.user};
      state.isRootUser = action.payload.user.id === 1;
      state.accessToken = {
        access_token: action.payload.access_token,
        token_type: action.payload.token_type,
      };
      setBrowserAuthKey(state.accessToken);
    },
    updateAuthUser: (state, action) => {
      state.authUser = action.payload.user;
    },
    logout: () => {
      delBrowserAuthKey();
      return { ...initialAuthState, isLoggedIn: false, isRootUser: false };
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
