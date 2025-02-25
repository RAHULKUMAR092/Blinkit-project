import { configureStore } from "@reduxjs/toolkit";
import usrReducer from "./userSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    user: usrReducer,
    product: productReducer,
  },
});
