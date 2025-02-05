import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/miscellanouous/statuses";
import {API} from "../http";
// import axios from "axios";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: [],
        status: STATUSES.SUCCESS,
        token: "",
    },
    reducers: {
        setUser(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        logout(state) {
            state.token = null;
            state.status = STATUSES.SUCCESS;
            state.data = [];
            },
        
    },
});

export const { setUser, setStatus,setToken, logout } = authSlice.actions;
export default authSlice.reducer;

export const registerUser = (data) => {
    return async function registerUserThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.post("/register", data);
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
            console.log(err);
        }
    };
};

//logging user in with async thunk middleware and dispatching actions
export const loginUser = (data) => {
    return async function loginUserThunk(dispatch) {
        
        dispatch(setStatus(STATUSES.LOADING));
        try {
            //giging data to the endpoint and getting token in response for login access
            const response = await API.post("/login", data);
            //bringing out token from the data given from response
            dispatch(setUser(response.data.data));
            dispatch(setToken(response.data.token));
            dispatch(setStatus(STATUSES.SUCCESS));
            localStorage.setItem("token", response.data.token);
            
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
            console.log(err);
        }
    };
};