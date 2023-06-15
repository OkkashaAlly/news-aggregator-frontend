import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Types ==============================================
export interface SearchState {
  user:
    | {
        name: string;
        email: string;
        password: string;
      }
    | undefined;
  registered: boolean;
  loading: boolean;
  error: string | undefined;
}

// Initial State ==============================================
const initialState: SearchState = {
  user: undefined,
  registered: false,
  loading: false,
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

// Slice ==============================================
export const registerUserSlice = createSlice({
  name: "registerUser",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registerUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = true;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Exports ==============================================
export default registerUserSlice.reducer;
