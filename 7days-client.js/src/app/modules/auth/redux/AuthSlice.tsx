import InitialState, { UpdateAuthAction } from "./AuthRedux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = {
  isAuth: false,
  user: null,
};

export const AuthSlice = createSlice({
  name: UpdateAuthAction,
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
      console.log(action.payload)
    },
    setAuthUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setAuthUser } =
AuthSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default AuthSlice.reducer;
