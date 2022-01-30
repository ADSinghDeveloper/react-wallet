import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    accessToken: { token: "", type: "" },
    authUser: { name: "" },
    signUp: false,
    profile: false,
  };

const authSlice = createSlice({
   name: 'auth',
   initialState, // JS short-code of initialState : initialState,
   reducers: {
    setLoggedInData: (state, action) => {
      state.isLoggedIn = action.payload.login_status;
      state.authUser = action.payload.user;
      state.accessToken = { token: action.payload.token, type: action.payload.token_type };
      state.signUp = false;
    },
    updateAuthUser: (state, action) => {
      state.authUser = action.payload.user;
    },
    logout: () => {
      return initialState;
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
   }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
