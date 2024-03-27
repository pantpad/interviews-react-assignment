import { createSlice } from "@reduxjs/toolkit";

import { Product } from "../types/ProductType";
//import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
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
        (item) => item.product.id === action.payload.product.id
      );
      //if it is, check if quantity + value passed is 0
      if (inCart) {
        //remove item if quantity reaches 0
        if (inCart.quantity + action.payload.value === 0) {
          state.value.items = state.value.items.filter(
            (item) => item.product.id !== action.payload.product.id
          );
        } else {
          //update quantity if id is the same as product passed.
          //else return item
          state.value.items = state.value.items.map((item) =>
            item.product.id === action.payload.product.id
              ? {
                  product: { ...action.payload.product },
                  quantity: (inCart.quantity += action.payload.value),
                }
              : item
          );
        }
      } else {
        //if item is not in cart and quantity to add is positive,
        //add item
        //return current state.
        state.value.items =
          action.payload.value === 1
            ? [
                ...state.value.items,
                {
                  product: { ...action.payload.product },
                  quantity: 1,
                },
              ]
            : [...state.value.items];
      }
      //calculate totalPrice and totalItems
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
