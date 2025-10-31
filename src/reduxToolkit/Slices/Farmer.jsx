import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";
import { isLoggedIn } from "../../utils/utils";

export const fetchFarmer = createAsyncThunk(
  "farmer/fetchFarmer",
  async ({ page = 1, searchQuery = "", status }, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      // console.log("Auth Token being sent:", token);

      const response = await axios.get(`${credAndUrl.BASE_URL}/getAllFarmers`, {
        headers: {
          Authorization: token,
        },
        params: { page, search: searchQuery, status },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLocationFarmer = createAsyncThunk(
  "Services/fetchServices",
  async (
    { page = 1, searchQuery = "", section = "", farmerId },
    { rejectWithValue }
  ) => {
    try {
      const token = isLoggedIn("AdminData");

      const response = await axios.get(`${credAndUrl.BASE_URL}/getOneFarmer`, {
        headers: {
          Authorization: token,
        },
        params: {
          page,
          farmerId,
          section,
          search: searchQuery,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//   export const editSubAdmin = createAsyncThunk(
//   "subAdmin/editSubAdmin",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const token = isLoggedIn("AdminData");
//       const response = await axios.put(
//         `${credAndUrl?.BASE_URL}/updateSubAdmin`,
//         {
//           subAdminId: payload.subAdminId,
//           name: payload.name,
//           email: payload.email,
//           phone: payload.phone,
//           password: payload.password,
//           role: payload.role,
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

export const editFarmer = createAsyncThunk(
  "farmer/editFarmer",
  async ({ farmerId, payload }, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.put(
        `${credAndUrl?.BASE_URL}/deleteAndUpdate?farmerId=${farmerId}`,
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

export const deleteFarmer = createAsyncThunk(
  "farmer/deleteFarmer",
  async (farmerId, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.put(
        `${credAndUrl?.BASE_URL}/deleteAndUpdate?farmerId=${farmerId}`,
        {
          status: "deleted",
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
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
  farmerData: [],
  location: [],
  loading: false,
  error: null,
};

const farmerSlice = createSlice({
  name: "farmer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFarmer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFarmer.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;

        if (payload?.success === false) {
          state.farmerData = [
            {
              success: false,
              message: payload.message || "No farmers found",
              data: [],
              metadata: [],
            },
          ];
        } else if (payload?.success === true && Array.isArray(payload?.data)) {
          state.farmerData = payload.data;
        } else {
          state.farmerData = [
            {
              success: false,
              message: "No farmers found",
              data: [],
              metadata: [],
            },
          ];
        }
      })
      .addCase(fetchFarmer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.farmerData = [
          {
            success: false,
            message: "No farmers found",
            data: [],
            metadata: [],
          },
        ];
      })
      .addCase(fetchLocationFarmer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationFarmer.fulfilled, (state, action) => {
        state.loading = false;
        state.location = action.payload?.data;
        console.log(action.payload?.data);
      })
      .addCase(fetchLocationFarmer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default farmerSlice.reducer;
