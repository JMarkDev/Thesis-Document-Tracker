import axios from "../api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllDocuments = createAsyncThunk("document/all", async () => {
  const response = await axios.get("/document/all");
  return response.data;
});

export const filterDocumentsByESU = createAsyncThunk(
  "document/filter",
  async (esu) => {
    const response = await axios.get(`/document/filter-by-esu/${esu}`);
    console.log(response.data);
    return response.data;
  }
);

const documentsSlice = createSlice({
  name: "documents",
  initialState: {
    allDocuments: [],
    documentByESU: [],
    status: "idle",
  },
  error: null,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchAllDocuments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllDocuments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDocuments = action.payload;
      })
      .addCase(fetchAllDocuments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(filterDocumentsByESU.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filterDocumentsByESU.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDocuments = action.payload;
      })
      .addCase(filterDocumentsByESU.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// selectors
export const getAllDocuments = (state) => state.documents.allDocuments;
export const getStatus = (state) => state.documents.status;

export default documentsSlice.reducer;
