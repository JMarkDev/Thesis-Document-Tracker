import axios from "../api/axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunks
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("/users/get-all-user");
  return response.data;
});

export const fetchOffice = createAsyncThunk("users/fetchOffice", async () => {
  const response = await axios.get("/users/get-user-by-role?role=office");
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    officeUsers: [],
    status: "idle",
    officeStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builders) {
    builders
      // fetch users cases
      .addCase(fetchUsers.pending, (state) => {
        state.payload = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // fetch office cases
      .addCase(fetchOffice.pending, (state) => {
        state.officeStatus = "loading";
      })
      .addCase(fetchOffice.fulfilled, (state, action) => {
        state.officeStatus = "succeeded";
        state.officeUsers = action.payload;
      })
      .addCase(fetchOffice.rejected, (state, action) => {
        state.officeStatus = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors
export const getAllUsers = (state) => state.users.users;
export const getUserStatus = (state) => state.users.status;
export const getUserError = (state) => state.users.error;
export const getOfficeUsers = (state) => state.users.officeUsers;
export const getOfficeStatus = (state) => state.users.officeStatus;

export default usersSlice.reducer;
