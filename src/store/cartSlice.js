import { createSlice } from "@reduxjs/toolkit";
import { APIForAuthenticated } from "../http";
import { STATUSES } from "../globals/miscellanouous/statuses";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: STATUSES.SUCCESS,
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    updateItem(state, action) {
      const index = state.items.findIndex((item) => item._id === action.payload.productId);
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
      }
    },
    deleteItem(state, action) {
      const index = state.items.findIndex((item) => item._id === action.payload.productId);
      if (index !== -1) {
        // aplice for removingt an array  velement
        state.items.splice(index, 1);
      }
    }
  },
});

export const { setItems, setStatus, updateItem,deleteItem } = cartSlice.actions;

export default cartSlice.reducer;

export const atc = (productId) => {
  return async function atcThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIForAuthenticated.post(`/cart/${productId}`);
      dispatch(setItems(response.data.data));  // Make sure response contains updated cart
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (err) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(err);
    }
  };
};

export const fetchCartItems = () => {
  return async function atcThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIForAuthenticated.get(`/cart`);
      dispatch(setItems(response.data.data));  // Make sure response contains updated cart
      // console.log(response.data.data);
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (err) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(err);
    }
  };
};

export const deleteCart = (cartID) => {
  return async function deleteCartThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIForAuthenticated.delete(`/cart/${cartID}`);
      dispatch(deleteItem(cartID));  // Make sure response contains updated cart
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (err) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(err);
    }
  };
};

export const updateCartItem = (cartID, quantity) => {
  return async function updateCartItemThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIForAuthenticated.patch(`/cart/${cartID}`, { quantity });
      dispatch(setItems(response.data.updatedCart));  // Ensure the correct response field is used
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (err) {
      dispatch(setStatus(STATUSES.ERROR));
      console.error("Error updating cart item:", err.message);
    }
  };
};

