import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Types ==============================================
export interface SearchState {
  query: string;
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
  query: "headlines",
  search: undefined,
  loading: false,
  error: undefined,
};

export const searchNews = createAsyncThunk(
  "search/searchNews",
  async (search: string) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_NEWS_API_URL}everything?q=${search}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );

    return response.data;
  }
);

// Slice ==============================================
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
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

// Actions ==============================================
export const { setQuery } = searchSlice.actions;

// Reducer ==============================================
export default searchSlice.reducer;
