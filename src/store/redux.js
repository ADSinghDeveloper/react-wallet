import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import notificationReducer from "./notification";

const store = configureStore({
  reducer: { auth: authReducer, notification: notificationReducer }
});

export default store;
