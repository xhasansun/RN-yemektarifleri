import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserLoggedIn: false,
  userName: '',
  uid: '',
  favoritesList: [],
  recipesData: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    setFavoritesList: (state, action) => {
      state.favoritesList = action.payload;
    },
    setRecipesData: (state, action) => {
      state.recipesData = action.payload;
    },
  },
});

export const { setUserLoggedIn, setUserName, setUid, setFavoritesList, setRecipesData } = userSlice.actions;

export default userSlice.reducer;
