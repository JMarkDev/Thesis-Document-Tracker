import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../services/usersSlice";
import documentsReducer from "../services/documentSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    documents: documentsReducer,
  },
});
