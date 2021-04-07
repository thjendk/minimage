import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";

const rootReducer = combineReducers({
  auth: authReducer.reducer,
});
export type ReduxState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
