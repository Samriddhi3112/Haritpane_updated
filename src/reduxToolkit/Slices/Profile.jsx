import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";
import { isLoggedIn } from "../../utils/utils";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      // console.log("Auth Token being sent:", token);

      const response = await axios.get(`${credAndUrl.BASE_URL}/adminProfile`, {
        headers: {
          Authorization: token,
        },
      });
      // console.log("dd",response.data);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "password/changePassword",
  async ({ oldPassword, newPassword, reEnterPassword }, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      // console.log("Auth Token being sent:", token);

      const response = await axios.post(
        `${credAndUrl.BASE_URL}/changePassword`,
        {
          oldPassword,
          newPassword,
          reEnterPassword,
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
        error.response?.data || error.message
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      // console.log("Final payload to API:", payload);
      const response = await axios.put(
        `${credAndUrl?.BASE_URL}/editAdminProfile`,
        {
          name: payload.name,
          profileImage: payload.profileImage, 
        },
        {
          headers: { Authorization: token },
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


export const uploadProfileImage = createAsyncThunk(
  "profileImage/uploadProfileImage",
  async (file, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      // console.log("Auth Token being sent:", token);

      const formData = new FormData();
      formData.append("file", file); 

      const response = await axios.post(
        `${credAndUrl.BASE_URL}/saveImageToAwsAdmin`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("Upload Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const initialState = {
  profileData: [],
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload || [];
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default profileSlice.reducer;