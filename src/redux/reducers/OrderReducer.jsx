import { createSlice } from "@reduxjs/toolkit";
import { myOrders } from "../actions/OrderAction";

const orderSlice = createSlice({
    name:"orders",
    initialState: {
        orderInfo: [],
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers: {
        [myOrders.pending]: (state)=>{
            state.loading = true
        },
        [myOrders.fulfilled]:(state,action)=>{
            console.log(action.payload, "reducer")
            state.loading = false,
            state.orderInfo = action.payload
        },
        [myOrders.rejected]:(state,action) => {
            state.loading = false
            state.error = action.payload
            console.log(action.payload, "error")
        }
    }
})

export default orderSlice.reducer