import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default authReducer;
