import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryService } from 'services/categoryServices';

// export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (payload, thunkAPI) => {
//   const data = await userAPI.getCategory({ ...payload });
//   return data;
// });

// export const createCategory = createAsyncThunk(
//   'categories/createCategory',
//   async (category, { getState, rejectWithValue }) => {
//     try {
//       const state = getState().categories;
//       const data = await categoryService.createCategory(category);
//       return [data, ...state.data];
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const fetchCategoryById = createAsyncThunk("categories/fetchCategoryById ", async (id, { rejectWithValue }) => {
//   try {
//     const data = await getCategoryById(id);
//     return data;
//   } catch (err) {
//     return rejectWithValue(err.response.data);
//   }
// });

// export const updateCategory = createAsyncThunk(
//   'categories/updateUser',
//   async ({ id, values }, { rejectWithValue, getState }) => {
//     try {
//       const state = getState().categories;
//       await userAPI.updateCategory(id, values);
//       return state.data?.map((item) => (item.id === id ? values : item));
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const deleteCategory = createAsyncThunk('categories/deleteUser', async (id, thunkAPI) => {
//   const state = thunkAPI.getState().categories;
//   await userAPI.deleteCategory(id);
//   return state.data?.filter((item) => item.id !== id);
// });

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async ({ body, token }, { getState, rejectWithValue }) => {
    try {
      const state = getState().categories;
      const data = await CategoryService.create(body, token);
      return [data, ...state.data];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, body, token }, thunkAPI) => {
  try {
    const state = thunkAPI.getState().categories;
    await CategoryService.update(id, body, token);
    return state.data?.map((item) => (item.id === id ? body : item));
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (payload, thunkAPI) => {
  const data = await CategoryService.getAll(payload);
  return data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async ({ id, body, token }, thunkAPI) => {
  const { currentPage, limit } = thunkAPI.getState().categories;
  // await CategoryService.remove(id, token);
  await CategoryService.update(id, body, token);
  const data = await CategoryService.getAll({ page: currentPage, limit });
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

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCategories.fulfilled]: (state, { payload }) => {
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
    [fetchCategories.rejected]: (state, action) => {
      state.loading = false;
      //state.error = action.payload.message;
    },
    [deleteCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCategory.fulfilled]: (state, { payload }) => {
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
    [deleteCategory.rejected]: (state, action) => {
      state.loading = false;
      //state.error = action.payload.message;
    },
    [createCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [createCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [createCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [updateCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // [fetchCategories.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [fetchCategories.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.data = action.payload;
    // },
    // [fetchCategories.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },

    // [deleteCategory.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [deleteCategory.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.data = action.payload;
    // },
    // [deleteCategory.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
  },
});

export default categorySlice.reducer;
