import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: null,
  avatar: null,
};

// const localId = JSON.parse(localStorage.getItem("id"));
// const localUsername = JSON.parse(localStorage.getItem("username"));
// const localAvatar = JSON.parse(localStorage.getItem("avatar"));

// if (localId) {
//   initialState.id = localId;
//   initialState.username = localUsername;
//   initialState.avatar = localAvatar;
// }

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload;
      localStorage.setItem("id", JSON.stringify(action.payload));
    },
    loginUser: (state, action) => {
      state.username = action.payload;
      localStorage.setItem("username", JSON.stringify(action.payload));
    },
    setAvatarId: (state, action) => {
      state.avatar = action.payload;
      localStorage.setItem("avatar", JSON.stringify(action.payload));
      console.log(`from slice: ${action.payload}`);
    },
    logOutUser: (state, action) => {
      state.id = null;
    },
  },
});

export const { setUserId, loginUser, setAvatarId, logOutUser } =
  userSlice.actions;

export const selectId = (state) => state.user.id;
export const selectAvatarId = (state) => state.user.avatar;
export const selectUserName = (state) => state.user.username;

export default userSlice.reducer;
