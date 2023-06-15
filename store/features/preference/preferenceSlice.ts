import { createSlice } from "@reduxjs/toolkit";

// Types ==============================================
type Filter = { title: string; key: string };

export interface PreferenceState {
  sources: Filter[];
  categories: Filter[];
  countries: Filter[];
  languages: Filter[];
  sortBy: Filter[];
}

// Initial State ==============================================
const initialState: PreferenceState = {
  sources: [],
  categories: [],
  languages: [],
  countries: [],
  sortBy: [],
};

// Slice ==============================================
const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    addSource: (state, action) => {
      state.sources = action.payload;
    },
    removeSource: (state, action) => {
      state.sources = action.payload;
    },
    addCategory: (state, action) => {
      state.categories = action.payload;
    },
    removeCategory: (state, action) => {
      state.categories = action.payload;
    },
    addCountry: (state, action) => {
      state.countries = action.payload;
    },
    removeCountry: (state, action) => {
      state.countries = action.payload;
    },
    addLanguage: (state, action) => {
      state.languages = action.payload;
    },
    removeLanguage: (state, action) => {
      state.languages = action.payload;
    },
    addSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    removeSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

// Exports ==============================================
export const {
  addSource,
  removeSource,
  addCategory,
  removeCategory,
  addCountry,
  removeCountry,
  addLanguage,
  removeLanguage,
  addSortBy,
  removeSortBy,
} = preferenceSlice.actions;

export default preferenceSlice.reducer;
