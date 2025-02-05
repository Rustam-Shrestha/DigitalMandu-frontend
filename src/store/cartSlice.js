import { createSlice } from "@reduxjs/toolkit";
import { APIForAuthenticated } from "../http";
// import { setStatus } from "./productSlice";
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
      const index = state.items.findIndex((item) => item._id === action.payload._id);
      if(index !== -1){
        state.items[index].quantity = action.payload.quantity;
      }
    }
    // clear(state) {
    //   return [];
    // },
  },
});
//exporting actions to do and acton performers outside so it takes manual and performs as it is
export const { setItems, setStatus,updateitems } = cartSlice.actions;


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
      const response = await APIForAuthenticated.get(`/cart/`);
      dispatch(setItems(response.data.data));  // Make sure response contains updated cart
      console.log(response.data.data)
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (err) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(err);
    }
  };
};


export const deleteCart = (productId) => {
  return async function deleteCartThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIForAuthenticated.delete(`/cart/${productId}`);
      dispatch(setItems(response.data.data));  // Make sure response contains updated cart
      console.log(response.data.data)
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (err) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(err);
    }
  };
};

export const updateCartQty = (productId,quantity) => {
  return async function updateCartQtyThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIForAuthenticated.patch(`/cart/${productId}`,{quantity});
      dispatch(updateItem(productId,quantity));  // Make sure response contains updated cart
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (err) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(err);
    }
  };
};
