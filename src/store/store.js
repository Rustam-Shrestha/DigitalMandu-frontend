import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import productReducer from "./productSlice"
import authReducer from "./authSlice"
//configuring store room
const store = configureStore({
    //adding an item on store place which is made on cartslice already

    // reducers are always syncronous functions that take the current state and an action and return a new state
    reducer: {
        //it holds multiple reducers comma separted
        cart: cartReducer,
        product: productReducer,
        auth: authReducer
    }
})
export default store;