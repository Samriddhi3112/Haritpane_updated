import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";
import { isLoggedIn } from "../../utils/utils";

export const approveProviderByAdmin = createAsyncThunk(
  "verification/approveProviderByAdmin",
  async ({ providerId, adminApproval }, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");

      const response = await axios.put(
        `${credAndUrl.BASE_URL}/approveProviderByAdmin`,
        { providerId, adminApproval },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const fetchVerificationProduct = createAsyncThunk(
  "verification/fetchVerificationProduct",
  async (
    { page = 1, searchQuery = "", providerId  },
    { rejectWithValue }
  ) => {
    try {
      const token = isLoggedIn("AdminData");

      const response = await axios.get(`${credAndUrl.BASE_URL}/getAllProductForVerification`, {
        headers: {
          Authorization: token,
        },
        params: {
          page,
          providerId,
          search: searchQuery,
        },
      });
      console.log(response.data);
      return response.data.data?.[0]?.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const verificationSlice = createSlice({
  name: "verifications",
  initialState: {
    verification : [],
    loading: false,
    success: false,
    error: null,
    message: "",
  },
  reducers: {
    clearVerificationState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(approveProviderByAdmin.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = "";
      })
      .addCase(approveProviderByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message || "Action completed successfully";
      })
      .addCase(approveProviderByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(fetchVerificationProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchVerificationProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.verification = action.payload;
        state.message = "Products fetched successfully";
      })
      .addCase(fetchVerificationProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default verificationSlice.reducer;
