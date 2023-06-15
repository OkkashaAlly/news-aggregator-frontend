import { configureStore } from "@reduxjs/toolkit";

// Reducers ============================
import searchReducer from "./features/search/searchSlice";
import registerUserReducer from "./features/user/registerUserSlice";

// Store ============================
const store = configureStore({
  reducer: {
    search: searchReducer,
    registerUser: registerUserReducer,
  },
});

// Exports ==============================================
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
