import axios from "../api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("/auth/fetchUser", async () => {
  const response = await axios.get("/protected", { withCredentials: true });
  const email = response.data.user.email;
  if (email) {
    const userResponse = await axios.get(`/users/get-user?email=${email}`);
    return userResponse.data;
  }

  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logoutUser", async () => {
  await axios.post("/auth/logout", { withCredentials: true });
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    loading: true,
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userData = null;
      });
  },
});

// Selectors
export const getUserData = (state) => state.auth.userData;
export const getLoading = (state) => state.auth.loading;
export const getAuthError = (state) => state.auth.error;

export default authSlice.reducer;
