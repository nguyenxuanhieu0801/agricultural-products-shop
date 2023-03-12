import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from 'services/authServices';

//const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: null,
  token: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const register = createAsyncThunk('auth/register', async (values, thunkAPI) => {
  try {
    // const { token, ...data } = await authService.register(values);

    const { token, ...user } = await authService.register(values);
    localStorage.setItem('token', token);
    return {
      token,
      user,
    };
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk('auth/login', async (values, thunkAPI) => {
  try {
    // const { token, ...data } = await authService.login(values);
    // localStorage.setItem('token', token);
    // localStorage.setItem('user', JSON.stringify(data));
    const { token, ...user } = await authService.login(values);
    localStorage.setItem('token', token);
    return {
      token,
      user,
    };
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, { payload }) => {
      state.user = payload;
    },
    reset: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isError = false;
        state.message = '';
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isError = false;
        state.message = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
    // .addCase(logout.fulfilled, (state) => {
    //   state.user = null;
    // });
  },
});
export const { reset, updateAuth } = authSlice.actions;

export default authSlice.reducer;
