import axios from "../api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllWorkflow = createAsyncThunk("workflow/all", async () => {
  const response = await axios.get("/workflow/all");
  return response.data;
});

export const searchWorkflow = createAsyncThunk("/workflow", async (name) => {
  const response = await axios.get(`/workflow/search/${name}`);
  return response.data;
});

const workflowSlice = createSlice({
  name: "workflow",
  initialState: {
    allWorkflow: [],
    status: "idle",
  },
  error: null,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchAllWorkflow.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllWorkflow.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allWorkflow = action.payload;
      })
      .addCase(fetchAllWorkflow.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchWorkflow.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchWorkflow.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allWorkflow = action.payload;
      })
      .addCase(searchWorkflow.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllWorkflow = (state) => state.workflow.allWorkflow;

export default workflowSlice.reducer;
