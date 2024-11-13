import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: { user: userReducer },
});

export type RootType = ReturnType<typeof store.getState>;
