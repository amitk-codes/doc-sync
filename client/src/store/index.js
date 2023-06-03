import { configureStore, createSlice } from '@reduxjs/toolkit';

const progressSlice = createSlice({
  name: 'progress',
  initialState: 0,
  reducers: {
    setProgress: (state, action) => action.payload
  }
});


const store = configureStore({
  reducer: {
    progress: progressSlice.reducer
  }
});

export const { setProgress } = progressSlice.actions;
export default store;
