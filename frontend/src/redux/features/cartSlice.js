import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CartService } from 'services/cartServices';


export const fetchCart = createAsyncThunk('cart/fetchCart', async (payload, thunkAPI) => {
  const data = await CartService.findOne(payload);
  return data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ token, body }, thunkAPI) => {
  const data = await CartService.create(body, token);
  const list = await CartService.findOne(token);
  return list;
});

export const removeItem = createAsyncThunk('cart/removeItem', async ({ id, token }, thunkAPI) => {
  // const { currentPage, limit } = thunkAPI.getState().categories;
  // await CategoryService.remove(id, token);
  // const data = await CategoryService.getAll({ page: currentPage, limit });
  // return data;
  const state = thunkAPI.getState().cart;
  await CartService.remove(id, token);
  return state.data?.filter((item) => item.id !== id);
});

const initialState = {
  data: [],
  loading: false,
  error: undefined,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCart.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCart.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [fetchCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    [addToCart.pending]: (state, action) => {
      state.loading = true;
    },
    [addToCart.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [removeItem.pending]: (state, action) => {
      state.loading = true;
    },
    [removeItem.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [removeItem.rejected]: (state, action) => {
      state.loading = false;
      //state.error = action.payload.message;
    },
    // [createCategory.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [createCategory.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.data = action.payload;
    // },
    // [createCategory.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
    // [updateCategory.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [updateCategory.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.data = action.payload;
    // },
    // [updateCategory.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
  },
});

export default cartSlice.reducer;
