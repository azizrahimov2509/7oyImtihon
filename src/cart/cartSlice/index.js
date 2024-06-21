import { createSlice } from "@reduxjs/toolkit";

// Helper functions
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadState(),
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveState(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveState(state.items);
    },
    updateCartItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (action.payload.increment) {
          item.quantity += 1;
        } else if (item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      saveState(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem } = cartSlice.actions;

export default cartSlice.reducer;
