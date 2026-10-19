import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: false,
  isRootUser: null,
  authUser: { name: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState, // Can also use JS short-code of initialState : initialState,
  reducers: {
    setLoggedInData: (state, action) => {
      // We can immutate state object here in redux toolkit because it handles immutated object internally.
      state.isLoggedIn = !!action.payload.user;
      state.authUser = {...action.payload.user};
      state.isRootUser = action.payload.user.id === 1;
    },
    updateAuthUser: (state, action) => {
      state.authUser = {...action.payload.user};
    },
    logout: () => {
      return { ...initialAuthState };
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;