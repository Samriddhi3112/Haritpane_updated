import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";
import { isLoggedIn } from "../../utils/utils";

export const fetchManufacture = createAsyncThunk(
  "Services/fetchServices",
  async (
    { page = 1, searchQuery = "", section, adminApproval, status },
    { rejectWithValue }
  ) => {
    try {
      const token = isLoggedIn("AdminData");

      const response = await axios.get(
        `${credAndUrl.BASE_URL}/getAllManufacturer`,
        {
          headers: {
            Authorization: token,
          },
          params: {
            page,
            section,
            status,
            search: searchQuery,
            adminApproval,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductDetail = createAsyncThunk(
  "manufacturer/fetchManufacturer",
  async (
    { page = 1, searchQuery = "", section = "", manufacturerId, status },
    { rejectWithValue }
  ) => {
    try {
      const token = isLoggedIn("AdminData");

      const response = await axios.get(
        `${credAndUrl.BASE_URL}/getOneManufacturer`,
        {
          headers: {
            Authorization: token,
          },
          params: {
            page,
            manufacturerId,
            section,
            search: searchQuery,
            status,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editServiceProvider = createAsyncThunk(
  "ServiceProvider/editServiceProvider",
  async (payload, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.put(
        `${credAndUrl?.BASE_URL}/updateServiceProvider`,
        {
          ServiceProviderId: payload.ServiceProviderId,
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

export const deleteManufacturer = createAsyncThunk(
  "manufacturer/deleteManufacturer",
  async (manufacturerId, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.put(
        `${credAndUrl?.BASE_URL}/deleteManufacturerById?manufacturerId=${manufacturerId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting Farmer:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteManufacturerProduct = createAsyncThunk(
  "manufacturerProduct/deleteManufacturerProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.put(
        `${credAndUrl?.BASE_URL}/deleteManufacturerProductById?productId=${productId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting Farmer:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  manufactures: [],
  productDetail: [],
  loading: false,
  error: null,
};

const manufactureSlice = createSlice({
  name: "manufacture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchManufacture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManufacture.fulfilled, (state, action) => {
        state.loading = false;
        state.manufactures = action.payload?.data;
      })
      .addCase(fetchManufacture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload?.data;
      });
  },
});

export default manufactureSlice.reducer;
