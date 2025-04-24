import { configureStore, createSlice } from '@reduxjs/toolkit';
import { decodeToken } from 'react-jwt';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = decodeToken(action.payload.token);
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    playlists: [],
    currentSong: null,
  },
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const { setPlaylists, setCurrentSong } = musicSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    music: musicSlice.reducer,
  },
});

export default store;