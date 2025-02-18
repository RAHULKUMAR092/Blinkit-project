import { configureStore } from "@reduxjs/toolkit";
import usrReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: usrReducer,
  },
});
