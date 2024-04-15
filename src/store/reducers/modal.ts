import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: '661abefc0bfbe87adf4b1c80' as string | null,
  // initialState: null as string | null,
  reducers: {
    setId: (state, action) => action.payload,

    clearId: () => null,
    
  },
});

export const { setId, clearId } = modalSlice.actions;

export default modalSlice.reducer;