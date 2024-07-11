import axios from "../api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunks
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("/users/get-all-user");
  return response.data;
});

const fetchRoleUsers = (role) => {
  return createAsyncThunk(`users/fetch${role}`, async () => {
    const response = await axios.get(`/users/get-user-by-role?role=${role}`);
    return response.data;
  });
};

export const fetchOffice = fetchRoleUsers("office");
export const fetchRegistrar = fetchRoleUsers("registrar");
export const fetchCampusAdmin = fetchRoleUsers("campus_admin");
export const fetchFaculty = fetchRoleUsers("faculty");

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

const searchRoleUsers = (role) => {
  return createAsyncThunk(`users/search${role}`, async (name) => {
    const response = await axios.get(`/users/search/${name}/${role}`);
    return response.data;
  });
};

export const searchOfficeRole = searchRoleUsers("office");
export const searchRegistrarRole = searchRoleUsers("registrar");
export const searchCampusAdminRole = searchRoleUsers("campus_admin");
export const searchFacultyRole = searchRoleUsers("faculty");

export const filterFacultyByCampus = createAsyncThunk(
  "users/filter-faculty",
  async (esuCampus) => {
    const response = await axios.get(`/users/filter-faculty/${esuCampus}`);
    return response.data;
  }
);

// idle: This is the initial state before the request has been initiated. It means that no request has been made yet.
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    roleUsers: {
      office: [],
      registrar: [],
      campus_admin: [],
      faculty: [],
    },

    status: {
      users: "idle",
      admin: "idle",
      office: "idle",
      registar: "idle",
      campus_admin: "idle",
      faculty: "idle",
      search: "idle",
      filter: "idle",
    },
  },
  error: null,
  reducers: {},
  extraReducers(builders) {
    // search faculty
    builders
      // fetch users cases
      .addCase(fetchUsers.pending, (state) => {
        state.payload = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status.users = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status.users = "failed";
        state.error = action.error.message;
      })
      // fetch office cases
      .addCase(fetchOffice.pending, (state) => {
        state.status.office = "loading";
      })
      .addCase(fetchOffice.fulfilled, (state, action) => {
        state.status.office = "succeeded";
        state.roleUsers.office = action.payload;
      })
      .addCase(fetchOffice.rejected, (state, action) => {
        state.status.office = "failed";
        state.error = action.error.message;
      })
      // fetch registrar cases
      .addCase(fetchRegistrar.pending, (state) => {
        state.status.registar = "loading";
      })
      .addCase(fetchRegistrar.fulfilled, (state, action) => {
        state.status.registar = "succeeded";
        state.roleUsers.registrar = action.payload;
      })
      .addCase(fetchRegistrar.rejected, (state, action) => {
        state.status.registar = "failed";
        state.error = action.error.message;
      })
      // fetch campus admin cases
      .addCase(fetchCampusAdmin.pending, (state) => {
        state.status.campus_admin = "loading";
      })
      .addCase(fetchCampusAdmin.fulfilled, (state, action) => {
        state.status.campus_admin = "succeeded";
        state.roleUsers.campus_admin = action.payload;
      })
      .addCase(fetchCampusAdmin.rejected, (state, action) => {
        state.status.campus_admin = "failed";
        state.error = action.error.message;
      })
      // fetch approved faculty
      .addCase(fetchFaculty.pending, (state) => {
        state.status.faculty = "loading";
      })
      .addCase(fetchFaculty.fulfilled, (state, action) => {
        state.status.faculty = "succeeded";
        state.roleUsers.faculty = action.payload;
      })
      .addCase(fetchFaculty.rejected, (state, action) => {
        state.status.faculty = "failed";
        state.error = action.error.message;
      })
      // delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        ["office", "registrar", "campus_admin", "faculty"].forEach((role) => {
          state.roleUsers[role] = state.roleUsers[role].filter(
            (user) => user.id !== action.payload
          );
        });
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // search office
      .addCase(searchOfficeRole.fulfilled, (state, action) => {
        state.status.search = "succeeded";
        state.roleUsers.office = action.payload;
      })
      .addCase(searchOfficeRole.rejected, (state, action) => {
        state.status.search = "failed";
        state.error = action.error.message;
      })
      // search registrar
      .addCase(searchRegistrarRole.fulfilled, (state, action) => {
        state.status.search = "succeeded";
        state.roleUsers.registrar = action.payload;
      })
      .addCase(searchRegistrarRole.rejected, (state, action) => {
        state.status.search = "failed";
        state.error = action.error.message;
      })
      // search campus admin
      .addCase(searchCampusAdminRole.fulfilled, (state, action) => {
        state.status.search = "succeeded";
        state.roleUsers.campus_admin = action.payload;
      })
      .addCase(searchCampusAdminRole.rejected, (state, action) => {
        state.status.search = "failed";
        state.error = action.error.message;
      })
      .addCase(searchFacultyRole.fulfilled, (state, action) => {
        state.status.search = "succeeded";
        state.roleUsers.faculty = action.payload;
      })
      .addCase(searchFacultyRole.rejected, (state, action) => {
        state.status.search = "failed";
        state.error = action.error.message;
      })
      .addCase(filterFacultyByCampus.fulfilled, (state, action) => {
        state.status.filter = "succeeded";
        state.roleUsers.faculty = action.payload;
      })
      .addCase(filterFacultyByCampus.rejected, (state, action) => {
        state.status.filter = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors
export const getAllUsers = (state) => state.users.users;
export const getUserStatus = (state) => state.users.status.users;
export const getUserError = (state) => state.users.error;

export const getRoleUsers = (role) => (state) => state.users.roleUsers[role];
export const getRoleStatus = (role) => (state) => state.users.status[role];

export const getFilterStatus = (state) => state.users.state.filter;
export const getSearchStatus = (state) => state.user.state.search;

export default usersSlice.reducer;
