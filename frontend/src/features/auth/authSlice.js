import { createSlice } from '@reduxjs/toolkit';

// Get user from localStorage if it exists
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // We will add our reducers here that change the state
    // e.g., for when an action starts, succeeds, or fails
    reset: (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
    }
  },
  extraReducers: (builder) => {
    // We will add our async thunk cases here
    // e.g., register.pending, register.fulfilled, register.rejected
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;