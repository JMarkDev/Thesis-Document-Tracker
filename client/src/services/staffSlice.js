import axios from "../api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStaff = createAsyncThunk("staff/fetchStaff", async (id) => {
  try {
    const response = await axios.get(`/office/staff-by-officeId/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  async ({ email, toast }) => {
    try {
      const response = await axios.delete(`/office/delete-staff/${email}`);
      toast.success(response.data.message);
      return email;
    } catch (error) {
      console.log(error);
    }
  }
);

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    allStaff: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builders) {
    builders.addCase(fetchStaff.pending, (state) => {
      state.status = "loading";
    });
    builders.addCase(fetchStaff.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.allStaff = action.payload;
    });
    builders.addCase(fetchStaff.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builders.addCase(deleteStaff.pending, (state) => {
      state.status = "loading";
    });
    builders.addCase(deleteStaff.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.allStaff = state.allStaff.filter(
        (staff) => staff.email !== action.payload
      );
    });
    builders.addCase(deleteStaff.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const getStaff = (state) => state.staff.allStaff;
export const staffStatus = (state) => state.staff.status;

export default staffSlice.reducer;
