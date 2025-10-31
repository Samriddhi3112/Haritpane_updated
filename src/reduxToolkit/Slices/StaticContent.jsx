import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";
import { isLoggedIn } from "../../utils/utils";

export const fetchStaticData = createAsyncThunk(
  "staticData/fetchStaticData",
  async (_, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      // console.log("Auth Token being sent:", token);

      const response = await axios.get(
        `${credAndUrl.BASE_URL}/getStaticContent?appType=SERVICE_PROVIDER`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editStaticData = createAsyncThunk(
  "staticData/editStaticData",
  async (payload, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.put(
        `${credAndUrl?.BASE_URL}/updateStaticContent`,
        {
          generalId: payload.id,         
          description: payload.description,
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

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Slice
const staticContentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    resetDepartments: (state) => {
      state.departments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaticData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaticData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data || [];
      })
      .addCase(fetchStaticData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default staticContentSlice.reducer;
