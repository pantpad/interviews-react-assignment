import { createSlice } from "@reduxjs/toolkit";

import { Product } from "../types/ProductType";
// import { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store/store";

interface CartItem {
  product: Product;
  quantity: number;
}

interface Cart {
  value: {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
  };
}

const initialState: Cart = {
  value: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = state.value.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.value.items.push(action.payload);
      }
      state.value.totalItems += action.payload.quantity;
      state.value.totalPrice +=
        action.payload.product.price * action.payload.quantity;
    },
    setCart: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
