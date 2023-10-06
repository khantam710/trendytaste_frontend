import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const myOrders = createAsyncThunk("myOrders", async(userID, {rejectWithValue}) => {
    console.log(userID, "user ID action")
    const response = await axios.get(`http://localhost:5000/mern-pizza/user-order/${userID}`)
    console.log(response, "response")
    try{
        const result = response.data.data
        console.log(result, "result")
        return result
    }catch(error) {
        return rejectWithValue(error)
    }
})