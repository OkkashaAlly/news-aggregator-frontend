import { configureStore } from "@reduxjs/toolkit";

// Reducers ============================
import searchReducer from "./features/news/searchSlice";
import authReducer from "./features/user/authSlice";

// Store ============================
const store = configureStore({
  reducer: {
    news: searchReducer,
    auth: authReducer,
  },
});

// Exports ==============================================
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
