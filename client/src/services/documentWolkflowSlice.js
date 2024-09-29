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
  async ({ workflow, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/workflow/add", workflow);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        return response.data.workflow;
      }
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const updateWorkflow = createAsyncThunk(
  "workflow/update/id",
  async ({ id, workflow, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/workflow/update/${id}`, workflow);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        // Fetch the updated workflow to return
        const updatedWorkflowResponse = await axios.get(`/workflow/id/${id}`);
        return updatedWorkflowResponse.data;
      }
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
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
    updateStatus: "idle",
    error: null,
  },

  reducers: {
    resetWorkflowStatus: (state) => {
      state.status = "idle";
    },
  },
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
      })
      .addCase(updateWorkflow.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateWorkflow.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.allWorkflow = state.allWorkflow.map((workflow) =>
          workflow.id === action.payload.id ? action.payload : workflow
        );
      })
      .addCase(updateWorkflow.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllWorkflow = (state) => state.workflow.allWorkflow;
export const getWorkflowById = (state) => state.workflow.workflowById;
export const getWorkflowStatus = (state) => state.workflow.status;
export const updateWorkflowStatus = (state) => state.workflow.updateStatus;
export const { resetWorkflowStatus } = workflowSlice.actions;

export default workflowSlice.reducer;
