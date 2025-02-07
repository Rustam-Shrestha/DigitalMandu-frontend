import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/miscellanouous/statuses";
import {APIForAuthenticated} from "../http";
// import axios from "axios";

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        data: [],
        status: STATUSES.SUCCESS,
    },
    reducers: {
        setOrders(state, action) {
            state.data=action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        
        
    },
});

export const { setOrders, setStatus} = checkoutSlice.actions;
export default checkoutSlice.reducer;
export const createOrder = (data) => {
    return async function createOrderThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {

            const response = await APIForAuthenticated.post("/orders/", data);
            //response with json nested as data: has been sent 
            //now ewe are setting orders with the response data
            //that is returned with res.status200 and data in json
            dispatch(setOrders(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
            console.log(err);
        }
    };
};
