import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "shared/firebase";

const initialState = {
  isLogin: false,
  isMember: false,
  isAuthChecked: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeLoginStatus: (state, action) => {
      state.isLogin = !!action.payload;
    },
    changeMemberStatus: (state, action) => {
      state.isMember = !!action.payload;
    },
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
      console.log("setAuth완료");
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export default authSlice.reducer;
export const {
  changeLoginStatus,
  changeMemberStatus,
  setAuthChecked,
  setAccessToken,
} = authSlice.actions;

export const checkAuthState = () => async (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    dispatch(changeLoginStatus(!!user));
    dispatch(setAuthChecked(!!user));
    dispatch(changeLoginStatus(!!user));

    if (user) {
      try {
        const accessToken = await user.getIdToken();
        dispatch(setAccessToken(accessToken));
      } catch (error) {
        console.error("accessToken fetching에러: ", error);
      }
    }
  });
};
