import axios from "../api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all designations
export const fetchDesignation = createAsyncThunk(
  "fetch/designation",
  async () => {
    const response = await axios.get("/campus-designation/designations");
    return response.data;
  }
);

// Update a designation
export const updateDesignation = createAsyncThunk(
  "update/designation",
  async ({ editDesignation, toast }) => {
    const { id, name } = editDesignation;
    const response = await axios.put(`/campus-designation/designations/${id}`, {
      name,
    });

    if (response.data.status === "success") {
      toast.success(response.data.message);
      return response.data.data; // This is the updated designation data
    }
  }
);

export const deleteDesignation = createAsyncThunk(
  "delete/designation",
  async ({ id, toast }) => {
    const response = await axios.delete(
      `/campus-designation/designations/${id}`
    );
    if (response.data.status === "success") {
      toast.success(response.data.message);
      return id;
    }
    throw new Error("Failed to delete workflow");
  }
);

// Add a new designation
export const addDesignation = createAsyncThunk(
  "add/designation",
  async ({ name, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/campus-designation/designations`, {
        name,
      });

      if (response.data.status === "success") {
        toast.success(response.data.message);
        return response.data.data; // Return the new designation data
      }
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Slice definition
const designationSlice = createSlice({
  name: "designation",
  initialState: {
    designationList: [],
    designationId: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch designations
      .addCase(fetchDesignation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDesignation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designationList = action.payload;
      })
      .addCase(fetchDesignation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Add a new designation
      .addCase(addDesignation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDesignation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designationList = [...state.designationList, action.payload];
        // state.designationList.push(action.payload); // Add the new designation to the list
      })
      .addCase(addDesignation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      .addCase(updateDesignation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDesignation.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Use action.payload.id to find the correct index, not action.meta.arg.id
        const index = state.designationList.findIndex(
          (designation) => designation.id === action.payload.id
        );
        if (index !== -1) {
          state.designationList[index] = action.payload; // Update the designation with the new data
        }
      })
      .addCase(updateDesignation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Delete a designation
      .addCase(deleteDesignation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDesignation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designationList = state.designationList.filter(
          (designation) => designation.id !== action.payload
        ); // Remove the deleted designation from the list
      })
      .addCase(deleteDesignation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

// Selectors
export const getAllDesignation = (state) => state.designation.designationList;
export const getDesignationById = (state) => state.designation.designationId;

export default designationSlice.reducer;
