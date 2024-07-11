import axios from "../api/axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunks
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("/users/get-all-user");
  return response.data;
});

export const fetchOffice = createAsyncThunk("users/fetchOffice", async () => {
  const response = await axios.get("/users/get-user-by-role?role=office");
  return response.data;
});

export const fetchRegistrar = createAsyncThunk(
  "users/fetchRegistrar",
  async () => {
    const response = await axios.get("/users/get-user-by-role?role=registrar");
    return response.data;
  }
);

export const fetchCampusAdmin = createAsyncThunk(
  "users/fetchCampusAdmin",
  async () => {
    const response = await axios.get(
      "/users/get-user-by-role?role=campus_admin"
    );
    return response.data;
  }
);

export const fetchFaculty = createAsyncThunk("users/fetchFaculty", async () => {
  const response = await axios.get("/users/get-user-by-role?role=faculty");
  return response.data;
});

export const deleteUser = createAsyncThunk(
  "/users/deleteUser",
  async ({ id, toast }) => {
    const response = await axios.delete(`/users/delete/id/${id}`);
    if (response.data.status === "success") {
      toast.success(response.data.message);
      return id;
    }
    throw new Error("Failed to delete user");
  }
);

export const searchOfficeRole = createAsyncThunk(
  "users/searchOfficeRole",
  async (name) => {
    const response = await axios.get(`/users/search/${name}/office`);
    return response.data;
  }
);

export const searchRegistrarRole = createAsyncThunk(
  "users/searchRegistrarRole",
  async (name) => {
    const response = await axios.get(`/users/search/${name}/registrar`);
    return response.data;
  }
);

export const searchCampusAdminRole = createAsyncThunk(
  "users/searchCampusAdminRole",
  async (name) => {
    const response = await axios.get(`/users/search/${name}/campus_admin`);
    return response.data;
  }
);

export const searchFacultyRole = createAsyncThunk(
  "/users/searchFacultyRole",
  async (name) => {
    const response = await axios.get(`/users/search/${name}/faculty`);
    return response.data;
  }
);

// idle: This is the initial state before the request has been initiated. It means that no request has been made yet.
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    officeUsers: [],
    registrarUsers: [],
    campusAdminUsers: [],
    facultyUsers: [],
    status: "idle",
    officeStatus: "idle",
    registarStatus: "idle",
    campusAdminStatus: "idle",
    facultyStatus: "idle",
    error: null,
    searchStatus: "idle",
  },
  reducers: {},
  extraReducers(builders) {
    // search faculty
    builders
      // fetch users cases
      .addCase(fetchUsers.pending, (state) => {
        state.payload = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // fetch office cases
      .addCase(fetchOffice.pending, (state) => {
        state.officeStatus = "loading";
      })
      .addCase(fetchOffice.fulfilled, (state, action) => {
        state.officeStatus = "succeeded";
        state.officeUsers = action.payload;
      })
      .addCase(fetchOffice.rejected, (state, action) => {
        state.officeStatus = "failed";
        state.error = action.error.message;
      })
      // fetch registrar cases
      .addCase(fetchRegistrar.pending, (state) => {
        state.registarStatus = "loading";
      })
      .addCase(fetchRegistrar.fulfilled, (state, action) => {
        state.registarStatus = "succeeded";
        state.registrarUsers = action.payload;
      })
      .addCase(fetchRegistrar.rejected, (state, action) => {
        state.registarStatus = "failed";
        state.error = action.error.message;
      })
      // fetch campus admin cases
      .addCase(fetchCampusAdmin.pending, (state) => {
        state.campusAdminStatus = "loading";
      })
      .addCase(fetchCampusAdmin.fulfilled, (state, action) => {
        state.campusAdminStatus = "succeeded";
        state.campusAdminUsers = action.payload;
      })
      .addCase(fetchCampusAdmin.rejected, (state, action) => {
        state.campusAdminStatus = "failed";
        state.error = action.error.message;
      })
      // fetch approved faculty
      .addCase(fetchFaculty.pending, (state) => {
        state.facultyStatus = "loading";
      })
      .addCase(fetchFaculty.fulfilled, (state, action) => {
        state.facultyStatus = "succeeded";
        state.facultyUsers = action.payload;
      })
      .addCase(fetchFaculty.rejected, (state, action) => {
        state.facultyStatus = "failed";
        state.error = action.error.message;
      })
      // delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.officeUsers = state.officeUsers.filter(
          (user) => user.id !== action.payload
        );
        state.registrarUsers = state.registrarUsers.filter(
          (user) => user.id !== action.payload
        );
        state.campusAdminUsers = state.campusAdminUsers.filter(
          (user) => user.id !== action.payload
        );
        state.facultyUsers = state.facultyUsers.filter(
          (user) => user.id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // search office
      .addCase(searchOfficeRole.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.officeUsers = action.payload;
      })
      .addCase(searchOfficeRole.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.error = action.error.message;
      })
      // search registrar
      .addCase(searchRegistrarRole.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.registrarUsers = action.payload;
      })
      .addCase(searchRegistrarRole.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.error = action.error.message;
      })
      // search campus admin
      .addCase(searchCampusAdminRole.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.campusAdminUsers = action.payload;
      })
      .addCase(searchCampusAdminRole.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(searchFacultyRole.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.facultyUsers = action.payload;
      })
      .addCase(searchFacultyRole.rejected, (state, action) => {
        state.facultyStatus = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors
export const getAllUsers = (state) => state.users.users;
export const getUserStatus = (state) => state.users.status;
export const getUserError = (state) => state.users.error;

export const getOfficeUsers = (state) => state.users.officeUsers;
export const getOfficeStatus = (state) => state.users.officeStatus;

export const getRegistrarUsers = (state) => state.users.registrarUsers;
export const getRegistrarStatus = (state) => state.users.registarStatus;

export const getCampusAdminUsers = (state) => state.users.campusAdminUsers;
export const getCampusAdminStatus = (state) => state.users.campusAdminStatus;

export const getFacultyUsers = (state) => state.users.facultyUsers;
export const getFacultyStatus = (state) => state.users.facultyStatus;

export const getSearchStatus = (state) => state.user.searchStatus;

export default usersSlice.reducer;
