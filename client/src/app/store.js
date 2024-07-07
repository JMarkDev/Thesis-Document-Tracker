import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../services/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
