import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    filteredData: [],
    categories: [],
  },
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
      state.filteredData = action.payload;
    },
    searchData: (state, action) => {
      const searchTerm = action.payload.toLowerCase().trim();
      state.filteredData = state.data.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
    },
    filterData: (state, action) => {
      const { sort, category } = action.payload;

      let filtered = [...state.data];

      if (category) {
        filtered = filtered.filter((product) => product.category === category);
      }

      switch (sort) {
        case "rating":
          filtered = filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "price":
          filtered = filtered.sort((a, b) => b.price - a.price);
          break;
        case "name":
          filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "!name":
          filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          break;
      }

      state.filteredData = filtered;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { getData, searchData, filterData, setCategories } =
  productsSlice.actions;

export default productsSlice.reducer;

// Async action to fetch categories
export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await fetch("https://dummyjson.com/products/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    dispatch(setCategories(data));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
