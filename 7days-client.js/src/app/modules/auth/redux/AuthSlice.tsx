import InitialState, { UpdateAuthAction } from "./AuthRedux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = {
  isAuth: false,
};

export const AuthSlice = createSlice({
  name: UpdateAuthAction,
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth } =
AuthSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default AuthSlice.reducer;
