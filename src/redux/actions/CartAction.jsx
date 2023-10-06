import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get Cart
export const getCart = createAsyncThunk("getCart", async (args, {rejectWithValue}) => {
    const response = await axios.get('http://localhost:5000/cart/getcartdata');

    try{
        const result = await response.data.data;
        console.log(result)
        return result
    }catch(error) {
        return rejectWithValue(error)
    }
})

// Add to Cart
export const addtoCart = createAsyncThunk("addtoCart", async(payload, {rejectWithValue}) =>{
    console.log(payload, "cartpayload")
    const response = await axios.post(`http://localhost:5000/cart/addtocart/${payload.id}`, payload);

    try{
        const result = await response.data.data;
        // console.log("added to cart", result);
        return result
    }catch(error){
        return rejectWithValue(error)
    }
})

// Delete from Cart
export const deleteCart = createAsyncThunk("deleteCart", async(id, {rejectWithValue}) => {
    const response = await axios.delete(`http://localhost:5000/cart/deletecartitem/${id}`);
    
    try{
        const result = await response.data.data;
        // console.log("Deleted from cart", result);
        return result
    }catch(error){
        return rejectWithValue(error)
    }
})

// Update Cart
export const updateQuantity = createAsyncThunk("updateQuantity", async(payload, {rejectWithValue}) => {
    const response = await axios.patch(`http://localhost:5000/cart/updateQuantity/${payload._id}`, payload);

    try{
        const result = await response.data.data;
        // console.log("Update Cart", result);
        return result;
    }catch(error){
        return rejectWithValue(error)
    }
})

// Checkout
export const checkout = createAsyncThunk("checkout", async(payload, {rejectWithValue}) => {
    const response = await axios.post(`http://localhost:5000/mern-pizza/order`,payload)
    console.log(payload, "payload")
    const key = await axios.get(`http://localhost:5000/mern-pizza/getkey`)
    try{
        const result = response.data.data
        const options = {
            key: key.data.key, // Enter the Key ID generated from the Dashboard
            amount: payload.amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "MOJO Pizza",
            description: "Razorpay Transaction",
            image: "https://cdn.razorpay.com/logos/MBJOLpZiIZn1zm_medium.png",
            order_id: result.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "http://localhost:5000/mern-pizza/payment",
            prefill: {
                name: payload.userName,
                email: payload.email,
            },
            notes: {
                address: "MOJO Pizza"
            },
            theme: {
                color: "#F4781D"
            }
        };
        var razor = new window.Razorpay(options);   
        razor.open();    
    }catch(error){
        return rejectWithValue(error)
    }
})