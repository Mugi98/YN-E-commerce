import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProductsByFilters,
  fetchAllCategories,
  fetchAllBrand,
  fetchProductById,
  createProduct,
  updateProduct,
} from "./ProductAPI";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
};

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, sort, pagination, admin }) => {
    const response = await fetchProductsByFilters(
      filter,
      sort,
      pagination,
      admin
    );
    return response.data;
  }
);

export const fetchAllBrandAsync = createAsyncThunk(
  "product/fetchAllBrand",
  async () => {
    const response = await fetchAllBrand();
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  "product/fetchAllCategories",
  async () => {
    const response = await fetchAllCategories();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action?.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action?.payload?.products;
        state.totalItems = action?.payload?.totalItems;
      })
      .addCase(fetchAllBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action?.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action?.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action?.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product?.id === action?.payload?.id
        );
        state.products[index] = action?.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state?.product?.products;
export const selectProductById = (state) => state?.product?.selectedProduct;
export const selectAllCategories = (state) => state?.product?.categories;
export const selectAllBrands = (state) => state?.product?.brands;
export const selectTotalItems = (state) => state?.product?.totalItems;
export const selectProductListStatus = (state) => state?.product?.status;

export default productSlice.reducer;
