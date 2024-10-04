import axios from "../api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllDocuments = createAsyncThunk(
  "document/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/document/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const fetchDocumentsByUserId = createAsyncThunk(
  "/document/get-all-documents-by-user-id/:user_id",
  async (user_id) => {
    const response = await axios.get(
      `/document/get-all-documents-by-user-id/${user_id}`
    );
    return response.data;
  }
);

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

export const searchDocumentByUserId = createAsyncThunk(
  "/search/:name/:user_id",
  async ({ name, user_id }) => {
    const response = await axios.get(`/document/search/${name}/${user_id}`);
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

export const filterUserDocuments = createAsyncThunk(
  "document/filter/status/:status/user_id/:user_id",
  async ({ status, user_id }) => {
    const response = await axios.get(
      `/document/filter/status/${status}/user_id/${user_id}`
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

export const sortSubmittedDocuments = createAsyncThunk(
  "document/submitted-by-user/sort",
  async ({ sortBy, order, user_id }) => {
    const response = await axios.get(
      `/document/submitted-by-user/sort?sortBy=${sortBy}&order=${order}&user_id=${user_id}`
    );
    return response.data;
  }
);

export const fetchDocumentByTrackingNum = createAsyncThunk(
  "document/tracking-numuber",
  async (tracking_number) => {
    const response = await axios.get(
      `/document/tracking-number/${tracking_number}`
    );
    return response.data;
  }
);
// export const fetchDocumentByTrackingNum = createAsyncThunk(
//   "document/tracking-number",
//   async ({ tracking_number, toast }, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `/document/tracking-number/${tracking_number}`
//       );
//       return response.data;
//     } catch (error) {
//       // Check if the error response exists and return the server message
//       if (error.response && error.response.data) {
//         toast.error(error.response.data.message);
//         return rejectWithValue(error.response.data.message);
//       }
//       // Otherwise, return a generic error message
//       return rejectWithValue(error.message);
//     }
//   }
// );

const documentsSlice = createSlice({
  name: "documents",
  initialState: {
    allDocuments: [],
    documentsByUserId: [],
    status: "idle",
    documentId: null,
    tracing_number: null,
    error: null,
  },

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
        state.error = action.payload || action.error.message;
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
      .addCase(searchDocumentByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchDocumentByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documentsByUserId = action.payload;
      })
      .addCase(searchDocumentByUserId.rejected, (state, action) => {
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
      .addCase(filterUserDocuments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filterUserDocuments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documentsByUserId = action.payload;
      })
      .addCase(filterUserDocuments.rejected, (state, action) => {
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
      })
      .addCase(sortSubmittedDocuments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sortSubmittedDocuments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documentsByUserId = action.payload;
      })
      .addCase(sortSubmittedDocuments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDocumentByTrackingNum.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDocumentByTrackingNum.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tracing_number = action.payload;
        state.error = null;
      })
      .addCase(fetchDocumentByTrackingNum.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        console.log(state.error);
      })
      .addCase(fetchDocumentsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDocumentsByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documentsByUserId = action.payload;
      })
      .addCase(fetchDocumentsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
    // .addCase(fetchDocumentByTrackingNum.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.payload || action.error.message;
    //   console.log(state.error); // Log the actual error message
    // });
  },
});

// selectors
export const getAllDocuments = (state) => state.documents.allDocuments;
export const getDocumentById = (state) => state.documents.documentId;
export const getDocumentByTrackingNum = (state) =>
  state.documents.tracing_number;
export const getStatus = (state) => state.documents.status;
export const documentError = (state) => state.documents.error;
export const getDocumentByTrackingNumber = (state) =>
  state.documents.tracing_number;
export const getAllDocumentsByUserId = (state) =>
  state.documents.documentsByUserId;

export default documentsSlice.reducer;
