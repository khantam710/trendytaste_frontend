import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get Pizza actions
export const getPizzas = createAsyncThunk("getPizzas", async (args, { rejectWithValue }) => {
    const response = await axios.get('http://localhost:5000/mern-pizza/get-pizza');

    try{
        const result = await response.data;
        return result
    }catch(error) {
        return rejectWithValue(error)
    }
})
