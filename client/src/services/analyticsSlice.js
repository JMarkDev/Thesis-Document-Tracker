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
  "/analytics/getDataESUByYear",
  async (year) => {
    try {
      const response = await axios.get(`/analytics/data-by-year/${year}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchFacultyDataByYear = createAsyncThunk(
  "/analytics/getFacultyDataESUByYear",
  async ({ user_id, year }) => {
    try {
      const response = await axios.get(
        `/analytics/data-by-user/${user_id}/${year}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchDataEsuByYear = createAsyncThunk(
  "/analytics/getDataByYear",
  async ({ year, esuCampus }) => {
    try {
      const response = await axios.get(
        `/analytics/document-by-esu/${esuCampus}/${year}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchDataOfficeByYear = createAsyncThunk(
  "/analytics/getDataOfficeByYear",
  async ({ officeName, year }) => {
    try {
      const response = await axios.get(
        `/analytics/document-by-esu/${officeName}/${year}`
      );
      console.log(response.data);
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

export const fetchReportEsuByYear = createAsyncThunk(
  "/analytics/getReportsEsuDocumentsByYear",

  async ({ year, esuCampus }) => {
    try {
      const response = await axios.get(
        `/analytics/document-reports/${year}/${esuCampus}`
      );
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
    facultyDataByYear: [],
    // officeDataByYear: [],
    dataByCampus: [],
    dataByType: [],
    reportsByYear: [],
    reportsByType: [],
    reportsDocumentByESU: [],
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
      .addCase(fetchFacultyDataByYear.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFacultyDataByYear.fulfilled, (state, action) => {
        state.facultyDataByYear = action.payload;
        state.loading = false;
      })
      .addCase(fetchFacultyDataByYear.rejected, (state) => {
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
      .addCase(fetchReportEsuByYear.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReportEsuByYear.fulfilled, (state, action) => {
        state.reportsDocumentByESU = action.payload;
        state.loading = false;
      })
      .addCase(fetchReportEsuByYear.rejected, (state) => {
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
      })
      .addCase(fetchDataEsuByYear.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataEsuByYear.fulfilled, (state, action) => {
        state.dataByYear = action.payload;
        state.loading = false;
      })
      .addCase(fetchDataEsuByYear.rejected, (state) => {
        state.loading = false;
      });
    // .addCase(fetchDataOfficeByYear.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(fetchDataOfficeByYear.fulfilled, (state, action) => {
    //   state.officeDataByYear = action.payload;
    //   state.loading = false;
    // })
    // .addCase(fetchDataOfficeByYear.rejected, (state) => {
    //   state.loading = false;
    // });
  },
});

// Selectors
export const getAdminCardData = (state) => state.analytics.adminCardData;
export const getDataByYear = (state) => state.analytics.dataByYear;
export const getDataByCampus = (state) => state.analytics.dataByCampus;
export const getDataByDocumentType = (state) => state.analytics.dataByType;
export const getFacultyDataByYear = (state) =>
  state.analytics.facultyDataByYear;

export const getReportsByYear = (state) => state.analytics.reportsByYear;
export const getReportsByType = (state) => state.analytics.reportsByType;
// export const getOfficeDataByYear = (state) => state.analytics.officeDataByYear;

export const getReportsDocumentByESU = (state) =>
  state.analytics.reportsDocumentByESU;

export const getLoading = (state) => state.analytics.loading;

export default analyticsSlice.reducer;
