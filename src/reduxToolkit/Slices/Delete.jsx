import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";
import { isLoggedIn } from "../../utils/utils";

export const sendDeleteOtp = createAsyncThunk(
  "otp/deleteOtp",
  async (_, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.post(
        `${credAndUrl?.BASE_URL}/sendOtpForDelete`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while deleting:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "delete/verifyOtp",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const token = isLoggedIn("AdminData");
      const response = await axios.post(
        `${credAndUrl?.BASE_URL}/verifyOtpAndDeleteService`,
        { otp },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);


const initialState = {
  deleteData: [],
  loading: false,
  error: null,
};

const deleteSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default deleteSlice.reducer;
