import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Types ==============================================
export interface SearchState {
  search:
    | {
        status: string;
        totalResults: number;
        articles: any[];
      }
    | undefined;
  loading: boolean;
  error: string | undefined;
}

// Initial State ==============================================
const initialState: SearchState = {
  search: undefined,
  loading: false,
  error: undefined,
};

export const searchNews = createAsyncThunk(
  "search/searchNews",
  async (search: string) => {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${search}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );

    console.log(response);
    
    return response.data;
  }
);

// Slice ==============================================
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(searchNews.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.search = undefined;
    });
    builder.addCase(searchNews.fulfilled, (state, action: any) => {
      state.loading = false;
      state.error = undefined;
      state.search = action.payload;
    });
    builder.addCase(searchNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Reducer ==============================================
export default searchSlice.reducer;
