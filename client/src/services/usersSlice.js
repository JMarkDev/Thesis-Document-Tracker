import axios from "../api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rolesList from "../constants/rolesList";

// Thunks
// export const registerUser = createAsyncThunk(
//   "users/register",
//   async (formData) => {
//     const response = await axios.post("/auth/register", formData);
//     return response.data;
//   }
// );

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

export const fetchOfficeUsers = () => {
  return createAsyncThunk("office/all", async () => {
    const response = await axios.get("/office/all");
    return response.data;
  });
};

export const fetchAdmin = fetchRoleUsers(rolesList.admin);
export const fetchOffice = fetchOfficeUsers(rolesList.office);
export const fetchRegistrar = fetchRoleUsers(rolesList.registrar);
export const fetchCampusAdmin = fetchRoleUsers(rolesList.campus_admin);
export const fetchFaculty = fetchRoleUsers(rolesList.faculty);

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

const searchOfficeUsers = () => {
  return createAsyncThunk(`office/search/:name`, async (name) => {
    const response = await axios.get(`/office/search/${name}`);
    return response.data;
  });
};

export const searchAdminRole = searchRoleUsers(rolesList.admin);
export const searchOfficeRole = searchOfficeUsers();
export const searchRegistrarRole = searchRoleUsers(rolesList.registrar);
export const searchCampusAdminRole = searchRoleUsers(rolesList.campus_admin);
export const searchFacultyRole = searchRoleUsers(rolesList.faculty);

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
      admin: [],
      office: [],
      registrar: [],
      campus_admin: [],
      faculty: [],
    },

    status: "idle",
    // {
    //   users: "idle",
    //   admin: "idle",
    //   office: "idle",
    //   registar: "idle",
    //   campus_admin: "idle",
    //   faculty: "idle",
    //   search: "idle",
    //   filter: "idle",
    // },
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
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // fetch admin cases
      .addCase(fetchAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roleUsers.admin = action.payload;
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // fetch office cases
      .addCase(fetchOffice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOffice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roleUsers.office = action.payload;
      })
      .addCase(fetchOffice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // fetch registrar cases
      .addCase(fetchRegistrar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRegistrar.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roleUsers.registrar = action.payload;
      })
      .addCase(fetchRegistrar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // fetch campus admin cases
      .addCase(fetchCampusAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampusAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roleUsers.campus_admin = action.payload;
      })
      .addCase(fetchCampusAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // fetch approved faculty
      .addCase(fetchFaculty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFaculty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roleUsers.faculty = action.payload;
      })
      .addCase(fetchFaculty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        ["admin", "office", "registrar", "campus_admin", "faculty"].forEach(
          (role) => {
            state.roleUsers[role] = state.roleUsers[role].filter(
              (user) => user.id !== action.payload
            );
          }
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // search admin
      .addCase(searchAdminRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roleUsers.admin = action.payload;
      })
      .addCase(searchAdminRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // search office
      .addCase(searchOfficeRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roleUsers.office = action.payload;
      })
      .addCase(searchOfficeRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // search registrar
      .addCase(searchRegistrarRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roleUsers.registrar = action.payload;
      })
      .addCase(searchRegistrarRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // search campus admin
      .addCase(searchCampusAdminRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roleUsers.campus_admin = action.payload;
      })
      .addCase(searchCampusAdminRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchFacultyRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roleUsers.faculty = action.payload;
      })
      .addCase(searchFacultyRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(filterFacultyByCampus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roleUsers.faculty = action.payload;
      })
      .addCase(filterFacultyByCampus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors
export const getAllUsers = (state) => state.users.users;
export const getUserStatus = (state) => state.users.status;
export const getUserError = (state) => state.users.error;

export const getRoleUsers = (role) => (state) => state.users.roleUsers[role];
export const getRoleStatus = (role) => (state) => state.users.status[role];

export const getFilterStatus = (state) => state.users.state.filter;
export const getSearchStatus = (state) => state.user.state.search;

export default usersSlice.reducer;
