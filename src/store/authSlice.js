import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/miscellanouous/statuses";
import axios from "axios";

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
        }
        
    },
});

export const { setUser, setStatus,setToken } = authSlice.actions;
export default authSlice.reducer;

export const registerUser = (data) => {
    return async function registerUserThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await axios.post("http://localhost:3000/api/register", data);
            dispatch(setUser(response.data.data));
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
            const response = await axios.post("http://localhost:3000/api/login", data);
            //bringing out token from the data given from response
            dispatch(setToken(response.data.token));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
            console.log(err);
        }
    };
};