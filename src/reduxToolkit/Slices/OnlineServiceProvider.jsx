import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";
import { isLoggedIn } from "../../utils/utils";

export const fetchServiceProvider = createAsyncThunk(
  "ServiceProvider/fetchServiceProvider",
  async ({ page = 1, searchQuery = "", status }, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      // console.log("Auth Token being sent:", token);

      const response = await axios.get(
        `${credAndUrl.BASE_URL}/getOnlineServiceProvidersDetails`,
        {
          headers: {
            Authorization: token,
          },
          params: { page, search: searchQuery, status },
          // params: { page, search: searchQuery },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchServices = createAsyncThunk(
  "Services/fetchServices",
  async (
    { page = 1, searchQuery = "", status = "", providerId },
    { rejectWithValue }
  ) => {
    try {
      const token = isLoggedIn("AdminData");

      const response = await axios.get(
        `${credAndUrl.BASE_URL}/getMyServicesCategory`,
        {
          headers: {
            Authorization: token,
          },
          params: {
            page,
            providerId,
            status,
            search: searchQuery,
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
  "service/editServiceProvider",
  async ({ providerId, payload }, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.put(
        `${credAndUrl?.BASE_URL}/deleteAndUpdateProvider?providerId=${providerId}`,
        { name: payload.name, email: payload.email, address: payload.address },
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

// export const deleteService = createAsyncThunk(
//   "service/deleteService",
//   async (serviceId, { rejectWithValue }) => {
//     try {
//       const token = isLoggedIn("AdminData");
//       const response = await axios.put(
//         `${credAndUrl?.BASE_URL}/deleteServices`,
//         {serviceId},
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting Farmer:", error);
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

export const deleteService = createAsyncThunk(
  "service/deleteService",
  async ({ providerId }, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.put(
        `${credAndUrl?.BASE_URL}/deleteAndUpdateProvider?providerId=${providerId}`,
        {
          status: "deleted",
        },
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
  onlineServiceProvider: [],
  services: [],
  loading: false,
  error: null,
};

const onlineServiceProviderSlice = createSlice({
  name: "onlineServiceProvider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.onlineServiceProvider = action.payload?.data;
      })
      .addCase(fetchServiceProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload?.data;
        console.log(action.payload?.data);
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default onlineServiceProviderSlice.reducer;
