import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Types ==============================================
export interface RegisterUserState {
  user:
    | {
        name: string;
        email: string;
        password: string;
      }
    | undefined;
  registered: boolean;
  loggedIn: boolean;
  loading: boolean;
  error: string | undefined;
}

// Initial State ==============================================
const initialState: RegisterUserState = {
  user: undefined,
  registered: false,
  loading: false,
  loggedIn: false,
  error: undefined,
};

// REGISTER USER
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: { name: string; email: string; password: string }) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/register`,
      user
    );

    console.log("response: ", response);

    return response.data;
  }
);

// LOGIN USER
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: { email: string; password: string }) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/login`,
      user
    );

    console.log("response: ", response);

    return response.data.user;
  }
);

// Slice ==============================================
export const registerUserSlice = createSlice({
  name: "registerUser",
  initialState,
  reducers: {},
  extraReducers: builder => {
    // REGISTER USER
    builder.addCase(registerUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = true;
      state.user = action.payload;
      state.loggedIn = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.loggedIn = false;
      state.registered = false;
      state.user = undefined;
    });
    // LOGIN USER
    builder.addCase(loginUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedIn = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.loggedIn = false;
      state.user = undefined;
    });
  },
});

// Exports ==============================================
export default registerUserSlice.reducer;
