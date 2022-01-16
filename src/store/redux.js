import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    accessToken: { token: "", type: "" },
    authUser: { name: "" },
    signUp: false,
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
    logout: () => {
      return initialState;
    },
    toRegister: (state) => {
      state.signUp = true;
    },
    toLogin: (state) => {
      state.signUp = false;
    },
   }
});

const store = configureStore({
  reducer: authSlice.reducer // Can also use object {auth: authSlice.reducer, any_other: otherSlice.reducer}
});

export const authActions = authSlice.actions;

export default store;
