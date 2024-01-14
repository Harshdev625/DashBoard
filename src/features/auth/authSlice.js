import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, createUser, logOut } from "./authAPI";

const initialState = {
  token: null,
  error: null,
  status: "idle",
};

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response; // Just return the entire response, assuming it contains { token: ... }
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await createUser(userInfo);
      return response; // Just return the entire response, assuming it contains { token: ... }
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const logOutAsync = createAsyncThunk(
  "auth/logOut",
  async (token, { rejectWithValue }) => {
    try {
      const response = await logOut(token);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.token = action.payload.token;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.token = action.payload.token;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(logOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.token = null;
      })
      .addCase(logOutAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.token;
export const selectError = (state) => state.auth.error;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
