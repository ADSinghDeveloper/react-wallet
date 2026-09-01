import { createContext, useReducer } from "react";

const initialState = {
  isLoggedIn: null,
  // accessToken: { token: "", type: "" },
  authUser: { name: "" },
};

const AuthContext = createContext({
  ...initialState,
  setLoggedInData: (loginData) => {},
  // register: () => {},
  // login: () => {},
  logout: () => {},
});

function authReducer(state,action){
  if(action.type === "LOGIN"){
    state = {
      ...state,
      isLoggedIn: true,
      authUser: {...action.payload.user},
      // accessToken: {
      //   token: action.payload.access_token,
      //   type: action.payload.token_type,
      // }
    }
  }
  if(action.type === "LOGOUT"){
    state = { ...initialState, isLoggedIn: false };
  }
      // updateAuthUser: (state, action) => {
      //   state.authUser = action.payload.user;
      // }
  return state;
}
// Context can be used without useReducer. Reducer is being used to prevent multiple useState hook.
export function AuthContextProvider ({children}) {
  const [authState, dispatchAuthStateAction] = useReducer(authReducer,{...initialState});
  
  const authContextState = {
    ...authState, // getting updated state from reducer.

    setLoggedInData: (loginData) => {
      dispatchAuthStateAction({
        type: "LOGIN",
        payload: loginData,
      });
    },
    logout: () => {
      dispatchAuthStateAction({
        type: "LOGOUT",
      });
    },
  }

  return (
    <AuthContext.Provider value={authContextState}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;