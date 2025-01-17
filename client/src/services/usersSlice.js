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

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id) => {
    const response = await axios.get(`/users/get-user-by-id/${id}`);
    return response.data;
  }
);

export const approveFaculty = createAsyncThunk(
  "/approved-faculty/id/:id/email/:email",
  async ({ id, email, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/users/approved-faculty/id/${id}/email/${email}`
      );

      const updatedUser = response.data.updatedUser;

      if (response.data.status === "success") {
        toast.success(response.data.message);
        return updatedUser; // Return the updated user data to the thunk's payload
      }

      throw new Error("Failed to approve faculty");
    } catch (error) {
      toast.error("Approval failed.");
      return rejectWithValue(error.message); // Return error message if request fails
    }
  }
);

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
export const fetchAdminStaff = fetchRoleUsers(rolesList.admin_staff);
export const fetchOffice = fetchOfficeUsers(rolesList.office);
export const fetchRegistrar = fetchRoleUsers(rolesList.registrar);
export const fetchCampusAdmin = fetchRoleUsers(rolesList.campus_admin);
export const fetchFaculty = fetchRoleUsers(rolesList.faculty);
// export const getAllFaculty = fetchRoleUsers(rolesList.faculty);

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

export const searchFaculty = createAsyncThunk(
  `users/searchFaculty`,
  async ({ name, role, esuCampus }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/users/search-faculty/${name}/role/${role}/esuCampus/${esuCampus}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchAdminRole = searchRoleUsers(rolesList.admin);
export const searchOfficeRole = searchOfficeUsers();
export const searchRegistrarRole = searchRoleUsers(rolesList.registrar);
export const searchCampusAdminRole = searchRoleUsers(rolesList.campus_admin);
export const searchFacultyRole = searchRoleUsers(rolesList.faculty);

export const filterFacultyByCampus = createAsyncThunk(
  "users/filter-faculty",
  async ({ esuCampus, role }) => {
    const response = await axios.get(
      `/users/filter-faculty/${esuCampus}/role/${role}`
    );
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
      admin_staff: [],
      office: [],
      registrar: [],
      campus_admin: [],
      faculty: [],
    },
    facultyByESU: [],
    userByid: null,

    status: {
      users: "idle",
      fetchById: "idle",
      admin: "idle",
      admin_staff: "idle",
      office: "idle",
      registar: "idle",
      campus_admin: "idle",
      faculty: "idle",
      search: "idle",
      filter: "idle",
    },
  },
  error: null,
  reducers: {
    clearUser(state) {
      state.userByid = null;
      state.error = null;
      state.facultyByESU = [];
      state.admin = [];
      state.admin_staff = [];
      state.office = [];
      state.registrar = [];
      state.campus_admin = [];
      state.faculty = [];
      state.status.users = "idle";
      state.status.fetchById = "idle";
      state.status.search = "idle";
      state.status.filter = "idle";
    },
  },
  extraReducers(builders) {
    // search faculty
    builders
      // fetch users cases
      .addCase(fetchUsers.pending, (state) => {
        state.status.users = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status.users = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status.users = "failed";
        state.error = action.error.message;
      })
      // fetch user by id
      .addCase(fetchUserById.pending, (state) => {
        state.status.fetchById = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status.fetchById = "succeeded";
        state.userByid = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status.fetchById = "failed";
        state.error = action.error.message;
      })
      // fetch admin cases
      .addCase(fetchAdmin.pending, (state) => {
        state.status.admin = "loading";
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.status.admin = "succeeded";
        state.roleUsers.admin = action.payload;
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.status.admin = "failed";
        state.error = action.error.message;
      })
      // fetch admin staff cases
      .addCase(fetchAdminStaff.pending, (state) => {
        state.status.admin_staff = "loading";
      })
      .addCase(fetchAdminStaff.fulfilled, (state, action) => {
        state.status.admin_staff = "succeeded";
        state.roleUsers.admin_staff = action.payload;
      })
      .addCase(fetchAdminStaff.rejected, (state, action) => {
        state.status.admin_staff = "failed";
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
        [
          "admin",
          "admin_staff",
          "office",
          "registrar",
          "campus_admin",
          "faculty",
        ].forEach((role) => {
          state.roleUsers[role] = state.roleUsers[role].filter(
            (user) => user.id !== action.payload
          );
        });
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // search admin
      .addCase(searchAdminRole.pending, (state) => {
        state.status.search = "loading";
      })
      .addCase(searchAdminRole.fulfilled, (state, action) => {
        state.status.search = "succeeded";
        state.roleUsers.admin = action.payload;
      })
      .addCase(searchAdminRole.rejected, (state, action) => {
        state.status.search = "failed";
        state.error = action.error.message;
      })
      // search office
      .addCase(searchOfficeRole.pending, (state) => {
        state.status.search = "loading";
      })
      .addCase(searchOfficeRole.fulfilled, (state, action) => {
        state.status.search = "succeeded";
        state.roleUsers.office = action.payload;
      })
      .addCase(searchOfficeRole.rejected, (state, action) => {
        state.status.search = "failed";
        state.error = action.error.message;
      })
      // search registrar
      .addCase(searchRegistrarRole.pending, (state) => {
        state.status.search = "loading";
      })
      .addCase(searchRegistrarRole.fulfilled, (state, action) => {
        state.status.search = "succeeded";
        state.roleUsers.registrar = action.payload;
      })
      .addCase(searchRegistrarRole.rejected, (state, action) => {
        state.status.search = "failed";
        state.error = action.error.message;
      })
      // search campus admin
      .addCase(searchCampusAdminRole.pending, (state) => {
        state.status.search = "loading";
      })
      .addCase(searchCampusAdminRole.fulfilled, (state, action) => {
        state.status.search = "succeeded";
        state.roleUsers.campus_admin = action.payload;
      })
      .addCase(searchCampusAdminRole.rejected, (state, action) => {
        state.status.search = "failed";
        state.error = action.error.message;
      })
      // search faculty
      .addCase(searchFacultyRole.pending, (state) => {
        state.status.search = "loading";
      })
      .addCase(searchFacultyRole.fulfilled, (state, action) => {
        state.status.search = "succeeded";
        state.roleUsers.faculty = action.payload;
      })
      .addCase(searchFacultyRole.rejected, (state, action) => {
        state.status.search = "failed";
        state.error = action.error.message;
      })
      .addCase(searchFaculty.pending, (state) => {
        state.status.search = "loading";
      })
      .addCase(searchFaculty.fulfilled, (state, action) => {
        state.status.search = "succeeded";
        state.facultyByESU = action.payload;
      })
      .addCase(searchFaculty.rejected, (state, action) => {
        state.status.search = "failed";
        state.error = action.error.message;
      })
      // filter faculty by campus
      .addCase(filterFacultyByCampus.pending, (state) => {
        state.status.filter = "loading";
      })
      .addCase(filterFacultyByCampus.fulfilled, (state, action) => {
        state.status.filter = "succeeded";
        state.facultyByESU = action.payload;
      })
      .addCase(filterFacultyByCampus.rejected, (state, action) => {
        state.status.filter = "failed";
        state.error = action.error.message;
      })
      // approve faculty
      .addCase(approveFaculty.pending, (state) => {
        state.status.faculty = "loading";
      })
      .addCase(approveFaculty.fulfilled, (state, action) => {
        state.roleUsers.faculty = state.roleUsers.faculty.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        });
      })
      .addCase(approveFaculty.rejected, (state, action) => {
        state.error = action.error.message;
      });

    // get all faculty
    // .addCase(getAllFaculty.pending, (state) => {
    //   state.status.filter = "loading";
    // })
    // .addCase(getAllFaculty.fulfilled, (state, action) => {
    //   state.status.faculty = "succeeded";
    //   state.roleUsers.faculty = action.payload;
    // })
    // .addCase(getAllFaculty.rejected, (state, action) => {
    //   state.status.faculty = "failed";
    //   state.error = action.error.message;
    // });
  },
});

// Selectors
export const getAllUsers = (state) => state.users.users;
export const getUserById = (id) => (state) =>
  state.users.users.find((user) => user.id === id);
export const getUserStatus = (state) => state.users.status.users;
export const getFetchedUserById = (state) => state.users.userByid;
export const getStatusById = (state) => state.users.status.fetchById;

export const getUserError = (state) => state.users.error;

export const getRoleUsers = (role) => (state) => state.users.roleUsers[role];
export const getRoleStatus = (role) => (state) => state.users.status[role];

export const getFilterStatus = (state) => state.users.state.filter;
export const getSearchStatus = (state) => state.user.state.search;
export const faculty = (state) => state.users.facultyByESU;

export const { clearUser } = usersSlice.actions;

export default usersSlice.reducer;
