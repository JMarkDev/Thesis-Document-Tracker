import axios from "../api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const adminAnalytics = createAsyncThunk(
  "/analytics/fetchAnalytics",
  async () => {
    try {
      const response = await axios.get("/analytics/admin-card-data");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchDataByYear = createAsyncThunk(
  "/analytics/getDataByYear",
  async (year) => {
    try {
      const response = await axios.get(`/analytics/data-by-year/${year}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchDataByCampus = createAsyncThunk(
  "/analytics/getDataByCampus",
  async () => {
    try {
      const response = await axios.get("/analytics/data-by-campus");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchDataByDocumentType = createAsyncThunk(
  "/analytics/getDataByDocumentType",
  async () => {
    try {
      const response = await axios.get("/analytics/document-type");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchReportsByYear = createAsyncThunk(
  "/analytics/getReportsByYear",
  async (year) => {
    try {
      const response = await axios.get(`/analytics/document-reports/${year}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchDocumentByType = createAsyncThunk(
  "/analytics/getDocumentByType",
  async (type) => {
    try {
      const response = await axios.get(`/analytics/document-by-type/${type}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    adminCardData: [],
    dataByYear: [],
    dataByCampus: [],
    dataByType: [],
    reportsByYear: [],
    reportsByType: [],
    loading: true,
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(adminAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminAnalytics.fulfilled, (state, action) => {
        state.adminCardData = action.payload;
        state.loading = false;
      })
      .addCase(adminAnalytics.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchDataByYear.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataByYear.fulfilled, (state, action) => {
        state.dataByYear = action.payload;
        state.loading = false;
      })
      .addCase(fetchDataByYear.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchDataByCampus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataByCampus.fulfilled, (state, action) => {
        state.dataByCampus = action.payload;
        state.loading = false;
      })
      .addCase(fetchDataByCampus.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchDataByDocumentType.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataByDocumentType.fulfilled, (state, action) => {
        state.dataByType = action.payload;
        state.loading = false;
      })
      .addCase(fetchDataByDocumentType.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchReportsByYear.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReportsByYear.fulfilled, (state, action) => {
        state.reportsByYear = action.payload;
        state.loading = false;
      })
      .addCase(fetchReportsByYear.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchDocumentByType.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDocumentByType.fulfilled, (state, action) => {
        state.reportsByType = action.payload;
        state.loading = false;
      })
      .addCase(fetchDocumentByType.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Selectors
export const getAdminCardData = (state) => state.analytics.adminCardData;
export const getDataByYear = (state) => state.analytics.dataByYear;
export const getDataByCampus = (state) => state.analytics.dataByCampus;
export const getDataByDocumentType = (state) => state.analytics.dataByType;

export const getReportsByYear = (state) => state.analytics.reportsByYear;
export const getReportsByType = (state) => state.analytics.reportsByType;

export const getLoading = (state) => state.analytics.loading;

export default analyticsSlice.reducer;
