import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToWishlist,
  fetchWishlistByUserId,
  deleteItemFromWishlist,
} from "./wishlistAPI";

const initialState = {
  status: "idle",
  wishlistItems: [],
  wishlistLoaded: false,
};

export const addToWishlistAsync = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ item, alert }) => {
    const response = await addToWishlist(item);
    alert.success("Item Added to Wishlist");
    return response.data;
  }
);

export const fetchWishlistByUserIdAsync = createAsyncThunk(
  "wishlist/fetchWishlistByUserId",
  async () => {
    const response = await fetchWishlistByUserId();
    console.log("RESPONSE", response);
    return response.data;
  }
);

export const deleteItemFromWishlistAsync = createAsyncThunk(
  "wishlist/deleteItemFromWishlist",
  async (itemId) => {
    const response = await deleteItemFromWishlist(itemId);
    return response?.data;
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlistAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items?.push(action.payload);
      })
      .addCase(fetchWishlistByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlistByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.wishlistItems = action?.payload;
        state.wishlistLoaded = true;
      })
      .addCase(fetchWishlistByUserIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.wishlistItems = action?.payload;
        state.wishlistLoaded = true;
      })
      .addCase(deleteItemFromWishlistAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromWishlistAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.wishlistItems.findIndex(
          (item) => item?.id === action?.payload?.id
        );
        state?.wishlistItems.splice(index, 1);
      });
  },
});

export const selectWishlist = (state) => state?.wishlist?.wishlistItems;
export const selectWishlistStatus = (state) => state?.wishlist?.status;

export default wishlistSlice.reducer;
