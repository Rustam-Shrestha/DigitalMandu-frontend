import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
//configuring store room
const store = configureStore({
    //adding an item on store place which is made on cartslice already
    reducer: {
        //it holds multiple reducers comma separted
        cart: cartReducer
    }
})
export default store;