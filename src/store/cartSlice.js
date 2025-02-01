import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter(item => item._id !== action.payload.id);
    },
    // clear(state) {
    //   return [];
    // },
  },
});
//exporting actions to do and acton performers outside so it takes manual and performs as it is
export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
