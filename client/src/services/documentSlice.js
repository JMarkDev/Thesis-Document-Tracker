import axios from "../api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllDocuments = createAsyncThunk("document/all", async () => {
  const response = await axios.get("/document/all");
  return response.data;
});

export const fetchDocumentById = createAsyncThunk("document/id", async (id) => {
  const response = await axios.get(`/document/id/${id}`);
  return response.data;
});

export const searchDocument = createAsyncThunk(
  "document/search",
  async (searchTerm) => {
    const response = await axios.get(`/document/search/${searchTerm}`);
    return response.data;
  }
);

export const filterDocumentsByESU = createAsyncThunk(
  "document/filter-by-esu",
  async (esu) => {
    const response = await axios.get(
      `/document/filter/field/esuCampus/value/${esu}`
    );
    // const response = await axios.get(`/document/filter-by-esu/${esu}`);
    return response.data;
  }
);

export const filterDocumentByType = createAsyncThunk(
  "document/filter-by-type",
  async (type) => {
    const response = await axios.get(
      `/document/filter/field/document_type/value/${type}`
    );
    return response.data;
  }
);

export const filterDocumentByStatus = createAsyncThunk(
  "document/filter-by-status",
  async (status) => {
    const response = await axios.get(
      `/document/filter/field/status/value/${status}`
    );
    return response.data;
  }
);

export const sortDocuments = createAsyncThunk(
  "document/sort",
  async ({ sortBy, order }) => {
    const response = await axios.get(
      `/document/sort?sortBy=${sortBy}&order=${order}`
    );
    return response.data;
  }
);

const documentsSlice = createSlice({
  name: "documents",
  initialState: {
    allDocuments: [],
    status: "idle",
    documentId: null,
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
      .addCase(searchDocument.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchDocument.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDocuments = action.payload;
      })
      .addCase(searchDocument.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // filter documents
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
      })
      .addCase(filterDocumentByType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filterDocumentByType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDocuments = action.payload;
      })
      .addCase(filterDocumentByType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(filterDocumentByStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filterDocumentByStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDocuments = action.payload;
      })
      .addCase(filterDocumentByStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDocumentById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDocumentById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documentId = action.payload;
      })
      .addCase(fetchDocumentById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // sort documents
      .addCase(sortDocuments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sortDocuments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDocuments = action.payload;
      })
      .addCase(sortDocuments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// selectors
export const getAllDocuments = (state) => state.documents.allDocuments;
export const getDocumentById = (state) => state.documents.documentId;
export const getStatus = (state) => state.documents.status;

export default documentsSlice.reducer;
