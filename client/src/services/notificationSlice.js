import axios from "../api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotificationById = createAsyncThunk("notification/user_id", async (user_id) => {
    const response = await axios.get(`/notification/user_id/${user_id}`)
    return response.data
})

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: [],
        status: "idle",
        user_id: null
    },
    reducers: {},
    extraReducers: (builders) => {
        builders
            .addCase(fetchNotificationById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchNotificationById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.notifications = action.payload;
            })
            .addCase(fetchNotificationById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const getNotificationById = (state) => state.notification.notifications;
export default notificationSlice.reducer;