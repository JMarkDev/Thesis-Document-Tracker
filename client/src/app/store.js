import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../services/authSlice";
import usersReducer from "../services/usersSlice";
import documentsReducer from "../services/documentSlice";
import workflowReducer from "../services/documentWolkflowSlice";
import notificationReducer from "../services/notificationSlice";
import staffReducer from "../services/staffSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    documents: documentsReducer,
    workflow: workflowReducer,
    notification: notificationReducer,
    staff: staffReducer,
  },
});
