import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";
import { isLoggedIn } from "../../utils/utils";

export const addSubAdmin = createAsyncThunk(
  "add/addSubAdmin",
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
      console.error(
        "Add subAdmin failed:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data?.message || "Try again!");
    }
  }
);

export const fetchSubAdmin = createAsyncThunk(
  "subAdmin/fetchSubAdmin",
  async ({page = 1, searchQuery = "" }, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      // console.log("Auth Token being sent:", token);

      const response = await axios.get(
        `${credAndUrl.BASE_URL}/getAllSubAdmins`,
        {
          headers: {
            Authorization: token,
          },
           params: { page, search: searchQuery },
          // params: { page, search: searchQuery },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

  export const editSubAdmin = createAsyncThunk(
  "subAdmin/editSubAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.put(
        `${credAndUrl?.BASE_URL}/updateSubAdmin`,
        {
          subAdminId: payload.subAdminId, 
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          password: payload.password,
          role: payload.role, 
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);


export const deleteSubAdmin = createAsyncThunk(
  "subAdmin/deleteSubAdmin",
  async (subAdminId, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.put(
        `${credAndUrl?.BASE_URL}/deleteSubAdmin`,
        { subAdminId: subAdminId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting Sub Admin:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  subAdminData: [],
  loading: false,
  error: null,
};

const subAdminSlice = createSlice({
  name: "subAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const subAdmins = action.payload?.data;
        state.subAdminData = Array.isArray(subAdmins) ? subAdmins : [];
      })
      .addCase(fetchSubAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSubAdmin.fulfilled, (state, action) => {
        state.subAdminData.push(action.payload.data);
      })
      .addCase(addSubAdmin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default subAdminSlice.reducer;