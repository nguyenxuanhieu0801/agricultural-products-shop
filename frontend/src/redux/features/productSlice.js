import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductService } from 'services/productServices';

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async ({ body, token }, { getState, rejectWithValue }) => {
    try {
      const state = getState().categories;
      const data = await ProductService.create(body, token);
      return [data, ...state.data];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (payload, thunkAPI) => {
  const data = await ProductService.getAll(payload);
  return data;
});

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, body, token }, { rejectWithValue, getState }) => {
    try {
      const state = getState().products;
      await ProductService.update(id, body, token);
      return state.data?.map((item) => (item.id === id ? body : item));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk('product/deleteProduct', async ({ id, token, body }, thunkAPI) => {
  console.log(body);
  const { currentPage, limit } = thunkAPI.getState().products;
  await ProductService.update(id, body, token);
  const data = await ProductService.getAll({ page: currentPage, limit });
  return data;
});

const initialState = {
  data: [],
  totalPages: undefined,
  limit: undefined,
  totalRecords: undefined,
  currentPage: undefined,
  loading: false,
  error: undefined,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.currentPage) {
        state.totalPages = payload.totalPages;
        state.limit = payload.limit;
        state.totalRecords = payload.totalRecords;
        state.currentPage = payload.currentPage;
        state.data = payload.data;
      } else {
        state.data = payload;
      }
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      //state.error = action.payload.message;
    },
    [updateProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.currentPage) {
        state.totalPages = payload.totalPages;
        state.limit = payload.limit;
        state.totalRecords = payload.totalRecords;
        state.currentPage = payload.currentPage;
        state.data = payload.data;
      } else {
        state.data = payload.data;
      }
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      //state.error = action.payload.message;
    },
  },
});

export default productSlice.reducer;
