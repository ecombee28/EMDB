import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: null,
  avatar: null,
  movies: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload;
      localStorage.setItem("id", action.payload);
    },
    loginUser: (state, action) => {
      state.username = action.payload;
      localStorage.setItem("username", action.payload);
    },
    setAvatarId: (state, action) => {
      state.avatar = action.payload;
      localStorage.setItem("avatar", action.payload);
    },
    setMovies: (state, action) => {
      state.movies = [...state.movies, action.payload];
      localStorage.setItem("movies", JSON.stringify(state.movies));
    },

    logOutUser: (state, action) => {
      state.id = null;
      state.user = null;
      state.movies = [];
      localStorage.clear();
    },
  },
});

export const { setUserId, loginUser, setAvatarId, setMovies, logOutUser } =
  userSlice.actions;

export const selectId = (state) => state.user.id;
export const selectAvatarId = (state) => state.user.avatar;
export const selectUserName = (state) => state.user.username;
export const selectMovies = (state) => state.user.movies;

export default userSlice.reducer;
