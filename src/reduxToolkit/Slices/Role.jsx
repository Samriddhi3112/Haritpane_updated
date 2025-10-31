import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";
import { isLoggedIn } from "../../utils/utils";

export const addRole = createAsyncThunk(
  "add/addRole",
  async (payload, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.post(
        `${credAndUrl?.BASE_URL}/createRole`,
        payload,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Add role failed:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Try again!");
    }
  }
);

export const addSubAdmin = createAsyncThunk(
  "add/addRole",
  async (payload, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.post(
        `${credAndUrl?.BASE_URL}/createSubAdmin`,
        payload,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Add role failed:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Try again!");
    }
  }
);

export const fetchRoleData = createAsyncThunk(
  "roleData/fetchRoleData",
  async (_, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      // console.log("Auth Token being sent:", token);

      const response = await axios.get(`${credAndUrl.BASE_URL}/getAllRoles`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editRoleData = createAsyncThunk(
  "editRole/editRoleData",
  async (payload, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.put(
        `${credAndUrl?.BASE_URL}/updateRole`,
        {
          roleId: payload.roleId,
          roleName: payload.roleName,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRoleData = createAsyncThunk(
  "role/deleteRole",
  async (roleId, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");

      const response = await axios.put(
        `${credAndUrl?.BASE_URL}/deleteRole`,
        {}, 
        {
          params: { roleId }, 
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error deleting role:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);


const initialState = {
  roleData: [],
  loading: false,
  error: null,
};

const staticContentSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoleData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoleData.fulfilled, (state, action) => {
        state.loading = false;
        state.roleData = action.payload?.data?.[0]?.data || [];
      })
      .addCase(fetchRoleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.roleData.push(action.payload.data);
      })
      .addCase(addRole.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default staticContentSlice.reducer;
