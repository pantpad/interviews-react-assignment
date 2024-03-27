import { createSlice } from "@reduxjs/toolkit";

import { Product } from "../types/ProductType";
//import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

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
      //check if item is in cart
      const inCart = state.value.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (inCart) {
        state.value.items = state.value.items.map((item) =>
          item.product.id === action.payload.id
            ? {
                product: { ...action.payload },
                quantity: (action.payload.itemInCart += 1),
              }
            : item
        );
      } else {
        state.value.items = [
          ...state.value.items,
          {
            product: { ...action.payload },
            quantity: 1,
          },
        ];
      }
      console.log(state.value.items, "items");
      console.log(state.value.totalItems, "totalItems");
      const totalPrice = state.value.items.reduce(
        (acc, { product, quantity }) => acc + product.price * quantity,
        0
      );
      const totalItems = state.value.items.reduce(
        (acc, { quantity }) => acc + quantity,
        0
      );
      state.value.totalPrice = totalPrice;
      state.value.totalItems = totalItems;
    },
    setCart: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCart, addItemToCart } = cartSlice.actions;

export const getCartItemById = (state: RootState, id: number) =>
  state.cart.value.items.find((item) => item.product.id === id);

export default cartSlice.reducer;
