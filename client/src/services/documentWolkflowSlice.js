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

export const addWorkflow = createAsyncThunk(
  "workflow/add",
  async ({ workflow, toast }) => {
    const response = await axios.post("/workflow/add", workflow);
    if (response.data.status === "success") {
      toast.success(response.data.message);
      return response.data.workflow;
    }
  }
);

export const fetchWorkflowById = createAsyncThunk(
  "/workflow/id",
  async (id) => {
    const response = await axios.get(`/workflow/id/${id}`);
    return response.data;
  }
);

export const deleteWorkflow = createAsyncThunk(
  "workflow/delete",
  async ({ id, toast }) => {
    const response = await axios.delete(`/workflow/delete/id/${id}`);
    if (response.data.status === "success") {
      toast.success(response.data.message);
      return id;
    }
    throw new Error("Failed to delete workflow");
  }
);
const workflowSlice = createSlice({
  name: "workflow",
  initialState: {
    allWorkflow: [],
    workflowById: null,
    status: "idle",
    error: null,
  },

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
      })
      .addCase(deleteWorkflow.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWorkflow.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allWorkflow = state.allWorkflow.filter(
          (workflow) => workflow.id !== action.payload
        );
      })
      .addCase(deleteWorkflow.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchWorkflowById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkflowById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workflowById = action.payload;
      })
      .addCase(fetchWorkflowById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addWorkflow.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addWorkflow.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allWorkflow = [...state.allWorkflow, action.payload];
      })
      .addCase(addWorkflow.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllWorkflow = (state) => state.workflow.allWorkflow;
export const getWorkflowById = (state) => state.workflow.workflowById;
export const getWorkflowStatus = (state) => state.workflow.status;

export default workflowSlice.reducer;
