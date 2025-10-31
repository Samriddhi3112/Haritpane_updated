import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";
import { isLoggedIn } from "../../utils/utils";

const initialState = {
  user: null,
  jwtToken: null,
  loading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  "auth/adminLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // const token = isLoggedIn("AdminData");
      const response = await axios.post(`${credAndUrl?.BASE_URL}/adminLogin`, {
        email,
        password,
      });
      const sessionData = JSON.stringify(response.data);
      sessionStorage.setItem("userType", sessionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Try again!"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${credAndUrl?.BASE_URL}/sendOtpForgotPassword`,
        {
          email,
        }
      );
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Verify OTP API Call
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${credAndUrl?.BASE_URL}/verifyOtpForForgotPassword`, {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Password Reset API Call
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, newPassword, reEnterPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${credAndUrl?.BASE_URL}/resetPassword`,
        {
          email,
          newPassword,
          reEnterPassword,
        }
      );
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// export const forgotPassword = createAsyncThunk(
//   "auth/forgotPassword",
//   async ({ email, route }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.post(
//         `${credAndUrl?.BASE_URL}/forgot-password`,
//         { email, route },
//         {
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         }
//       );

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Forgot password request failed. Try again!"
//       );
//     }
//   }
// );

export const logoutAdmin = createAsyncThunk(
  "auth/logoutAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      await axios.post(
        `${credAndUrl.BASE_URL}/adminLogout`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      localStorage.removeItem("AdminData");
      return true;
    } catch (error) {
      localStorage.removeItem("AdminData"); 
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //  builder.addCase();
  },
});

export default authSlice.reducer;