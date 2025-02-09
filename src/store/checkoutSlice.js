import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/miscellanouous/statuses";
import { APIForAuthenticated } from "../http";
// import axios from "axios";

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        data: [],
        status: STATUSES.SUCCESS,
    },
    reducers: {
        setOrders(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setOrders, setStatus } = checkoutSlice.actions;
export default checkoutSlice.reducer;
export const createOrder = (data) => {
    return async function createOrderThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await APIForAuthenticated.post("/orders/", data);
            console.log("API Response:", response.data.data); // Log the entire response

            if (response.data && response.data.data) {
                dispatch(setOrders(response.data)); // Ensure correct key
                dispatch(setStatus(STATUSES.SUCCESS));
            } else {
                console.warn("API response does not contain expected data:", response.data);
                dispatch(setStatus(STATUSES.ERROR));
            }
        } catch (err) {
            console.error("API Error:", err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
};

export const fetchOrder = () => {
    return async function fetchOrderThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await APIForAuthenticated.get("/orders/");
            console.log("API Response:", response.data.data); // Log the entire response

            if (response.data && response.data.data) {
                dispatch(setOrders(response.data.data)); // Ensure correct key
                dispatch(setStatus(STATUSES.SUCCESS));
            } else {
                console.warn("API response does not contain expected data:", response.data);
                dispatch(setStatus(STATUSES.ERROR));
            }
        } catch (err) {
            console.error("API Error:", err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
};
