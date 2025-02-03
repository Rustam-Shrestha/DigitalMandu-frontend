import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import API from "../http";
// freezing the status so it is immutable
const STATUSES = Object.freeze({
    SUCCESS: "success",
    LOADING: "loading",
    ERROR: "error",
});
const productSlice = createSlice({
    name: "product",
    //   unlike normal array we take two different states here
    //they are data array and statuscode which is supposed to be nested insie curly braces 

    initialState: {
        data: [],
        status: STATUSES.SUCCESS,
    },
    reducers: {
        // followng are like  getters and setters in java settting state from action(dispatch nor other  function)
        setProducts(state, action) {
            // state here refers to the initialState key above that will hold state of the data
            //the data is the empty array above now we are populating the data
            //action.payload is the data we are sending from the action

            // actully gettign data from axios request and send via dispatch to here
            state.data = action.payload;
        },
        setStatus(state, action) {
            // state here refers to the initialState key above that will hold state of the status
            //the status is the empty array above now we are populating the status
            //action.payload is the data we are sending from the action
            state.status = action.payload;
        },
    },
    //extra reducer that will work as an asynchronous  thunk
    extraReducers: (builder) => {
        //what following codes are doing: 
            //using each status and performing action in each action
            //fetching products from backend
            //if pending then loading
            //if fulfilled then success
            //if rejected then error
        
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = STATUSES.LOADING
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = STATUSES.SUCCESS
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = STATUSES.ERROR
            })

    }
});
export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;


//multiple product fetching using thunk
//fetching products from backend
//if pending then loading
//if fulfilled then success
//if rejected then error

// creating a fetchProducts function with asunc thunk giving alias as products/fetch 
// and using async await to fetch data from backend
export const fetchProducts = createAsyncThunk('products/fetch',async()=>{
    const response = await API.get("/products");
    const data = response.data.data 
    return data
})

//multiple products fetching code wih cusotmized function
// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         //loading in intermediate process
//         dispatch(setStatus(STATUSES.LOADING))
//         try{
//             const response = await axios.get("http://localhost:3000/api/products");
//             // following is sent as data to setProducts function above in reducers nested in action
//             //action.payload will display all adata to above
//             //data.data because we are sending data in data key from backend
//             //sending data and giving status as success
//             dispatch(setProducts(response.data.data))
//             dispatch(setStatus(STATUSES.SUCCESS))
//         }catch(error){
//             //loggiong error and notiying error in dispatch
//             console.log(error)
//             dispatch(setStatus(STATUSES.ERROR))
//         }
//     }
// }


//single product fetching code
// export function fetchSingleProducts(id) {
//     return async function fetchProductThunk(dispatch, getState) {
//         //loading in intermediate process
//         dispatch(setStatus(STATUSES.LOADING))
//         try{
//             const response = await axios.get("http://localhost:3000/api/products"+id);
//             // following is sent as data to setProducts function above in reducers nested in action
//             //action.payload will display all adata to above
//             //data.data because we are sending data in data key from backend
//             //sending data and giving status as success
//             dispatch(setProducts(response.data.data))
//             dispatch(setStatus(STATUSES.SUCCESS))
//         }catch(error){
//             //loggiong error and notiying error in dispatch
//             console.log(error)
//             dispatch(setStatus(STATUSES.ERROR))
//         }



//     }
// }

