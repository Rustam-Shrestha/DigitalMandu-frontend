import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    //giving name settting initial state and adding action performers(reducers)
  name: "cart",
  initialState:[],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      state = state.items.filter(item => item.id !== action.payload.id);
    },
    // clear(state) {
    //   state = [];
    // },
  },
});
//exporting actions to do and acton performers outside so it takes manual and performs as it is
export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;