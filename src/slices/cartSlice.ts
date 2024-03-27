import { createSlice } from "@reduxjs/toolkit";

import { Product } from "../types/ProductType";
//import { PayloadAction } from "@reduxjs/toolkit";
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
    addItemToCart(state, action) {
      console.log(action.payload);
      const item = state.value.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (item) {
        item.quantity += action.payload.quantity;
        state.value.totalPrice += item.product.price * action.payload.quantity;
      } else {
        state.value.items.push(action.payload);
      }
      state.value.totalItems += action.payload.quantity;
    },
    setCart: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCart, addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;
