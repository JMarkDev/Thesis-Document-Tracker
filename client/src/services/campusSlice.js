import axios from "../api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all designations
export const fetchEsuCampuses = createAsyncThunk(
  "fetch/esuCampuses",
  async () => {
    const response = await axios.get("/campus-designation/esuCampus");
    return response.data;
  }
);

// Update a designation
export const updateEsuCampus = createAsyncThunk(
  "update/esuCampuses",
  async ({ editCampus, toast }) => {
    const { id, name } = editCampus;
    const response = await axios.put(`/campus-designation/esuCampus/${id}`, {
      name,
    });

    if (response.data.status === "success") {
      toast.success(response.data.message);
      return response.data.data; // This is the updated designation data
    }
  }
);

export const deleteEsuCampus = createAsyncThunk(
  "delete/esuCampuses",
  async ({ id, toast }) => {
    const response = await axios.delete(`/campus-designation/esuCampus/${id}`);
    if (response.data.status === "success") {
      toast.success(response.data.message);
      return id;
    }
    throw new Error("Failed to delete workflow");
  }
);

// Add a new designation
export const addEsuCampus = createAsyncThunk(
  "add/esuCampuses",
  async ({ name, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/campus-designation/esuCampus", {
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
const esuCampusSlice = createSlice({
  name: "esuCampus",
  initialState: {
    campusList: [],
    campusId: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch designations
      .addCase(fetchEsuCampuses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEsuCampuses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.campusList = action.payload;
      })
      .addCase(fetchEsuCampuses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      .addCase(addEsuCampus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEsuCampus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.campusList = [...state.campusList, action.payload];
        // state.designationList.push(action.payload); // Add the new designation to the list
      })
      .addCase(addEsuCampus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      .addCase(updateEsuCampus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEsuCampus.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Use action.payload.id to find the correct index, not action.meta.arg.id
        const index = state.campusList.findIndex(
          (campus) => campus.id === action.payload.id
        );
        if (index !== -1) {
          state.campusList[index] = action.payload;
        }
      })
      .addCase(updateEsuCampus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      .addCase(deleteEsuCampus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEsuCampus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.campusList = state.campusList.filter(
          (campus) => campus.id !== action.payload
        );
      })
      .addCase(deleteEsuCampus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

// Selectors
export const getAllEsuCampuses = (state) => state.esuCampus.campusList;
export const getEsucampusId = (state) => state.esuCampus.campusId;

export default esuCampusSlice.reducer;
