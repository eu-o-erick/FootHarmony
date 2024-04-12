import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: null as string | null,
  reducers: {
    setId: (state, action) => action.payload,

    clearId: () => null,
    
  },
});

export const { setId, clearId } = modalSlice.actions;

export default modalSlice.reducer;