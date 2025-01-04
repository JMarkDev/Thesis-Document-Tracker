import axios from "../api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all programs
export const fetchPrograms = createAsyncThunk("fetch/programs", async () => {
  const response = await axios.get("/campus-designation/programs");
  return response.data;
});

export const fetchProgramHead = createAsyncThunk(
  "fetch/program-head",
  async (esuCampus) => {
    const response = await axios.get(
      `/users/get-program-head?esuCampus=${esuCampus}`
    );
    return response.data;
  }
);

// Update a program
export const updateProgram = createAsyncThunk(
  "update/programs",
  async ({ editProgram, toast }) => {
    const { id, name, abbreviation } = editProgram;
    const response = await axios.put(`/campus-designation/programs/${id}`, {
      name,
      abbreviation,
    });

    if (response.data.status === "success") {
      toast.success(response.data.message);
      return response.data.data; // This is the updated program data
    }
  }
);

export const deleteProgram = createAsyncThunk(
  "delete/programs",
  async ({ id, toast }) => {
    const response = await axios.delete(`/campus-designation/programs/${id}`);
    if (response.data.status === "success") {
      toast.success(response.data.message);
      return id;
    }
    throw new Error("Failed to delete workflow");
  }
);

// Add a new program
export const addProgram = createAsyncThunk(
  "add/programs",
  async ({ newProgram, toast }, { rejectWithValue }) => {
    try {
      const { name, abbreviation } = newProgram;
      const response = await axios.post("/campus-designation/programs", {
        name,
        abbreviation,
      });
      if (response.data.status === "success") {
        toast.success(response.data.message);
        return response.data.data; // Return the new program data
      }
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

const programSlice = createSlice({
  name: "program",
  initialState: {
    programs: [],
    programHead: [],
    programsById: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrograms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.status = "success";
        state.programs = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProgram.fulfilled, (state, action) => {
        state.programs = state.programs.map((program) =>
          program.id === action.payload.id ? action.payload : program
        );
      })
      .addCase(deleteProgram.fulfilled, (state, action) => {
        state.programs = state.programs.filter(
          (program) => program.id !== action.payload
        );
      })
      .addCase(addProgram.fulfilled, (state, action) => {
        state.programs.push(action.payload);
      })
      .addCase(fetchProgramHead.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProgramHead.fulfilled, (state, action) => {
        state.programHead = action.payload;
      })
      .addCase(fetchProgramHead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllPrograms = (state) => state.program.programs;
export const getProgramById = (state) => state.program.programsById;

export const getProgramHead = (state) => state.program.programHead;

export default programSlice.reducer;
