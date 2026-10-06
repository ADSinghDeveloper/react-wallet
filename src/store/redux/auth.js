import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: null,
  isRootUser: null,
  accessToken: null,
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
      state.accessToken = action.payload.accessToken;
    },
    updateAuthUser: (state, action) => {
      state.authUser = action.payload.user;
    },
    logout: () => {
      return { ...initialAuthState, isLoggedIn: false, isRootUser: false };
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;