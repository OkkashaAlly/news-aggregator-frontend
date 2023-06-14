import { configureStore } from "@reduxjs/toolkit";

// Reducers ============================
import searchReducer from "./features/search/searchSlice";

// Store ============================
const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

// Exports ==============================================
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
