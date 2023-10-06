import { createSlice } from "@reduxjs/toolkit";
import { addtoCart,getCart,deleteCart, updateQuantity, checkout } from "../actions/CartAction";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart : [],
        loading : false,
        error : null,
        cartTotal: 0,
        order: {}
    },
    reducers : {

    },
    extraReducers : {
        // Handling Get Cart promises
        [getCart.pending] : (state) => {
            state.loading = true;
        },
        [getCart.fulfilled] : (state,action) => {
            state.loading = false;
            state.cart = action.payload

            const priceArr = state.cart.map((val) => val.price);
            const sum = priceArr.reduce((a,b)=> a+b,0)
            state.cartTotal = sum
            // console.log(state.cart,"sum")
        },
        [getCart.rejected] : (state,action) => {
            state.loading = false;
            state.error = action.payload
        },

        // Handling Add to Cart promises
        [addtoCart.pending] : (state) => {
            state.loading = true;
        },

        // Handling Add to Cart promises
        [addtoCart.fulfilled]: (state, action) => {
            state.loading = false;
            const newItem = action.payload;
            const existingItem = state.cart.find((item) => item._id === newItem._id && item.size === newItem.size);
        
            if (existingItem) {
            // Update the quantity of the existing item
            existingItem.quantity += newItem.quantity;
            existingItem.size += newItem.size;
            } else {
            // Add the new item to the cart
            state.cart.push(newItem);
            
            // Update the cart in local storage
            localStorage.setItem("cart", JSON.stringify(state));
            }
            console.log(action.payload);
        },
  
        [addtoCart.rejected] : (state,action) => {
            state.loading = false;
            state.error = action.payload
        },

        // Handling Delete Cart Promises
        [deleteCart.pending] : (state) => {
            state.loading = true;
        },
        [deleteCart.fulfilled] : (state,action) => {
            state.loading = false;
            console.log(action.payload,"delete")
            const id = action.payload._id;
            if(id) {
                state.cart = state.cart.filter((val) => val._id !== id)
                state.cartTotal = state.cartTotal - action.payload.price
            }
        // Update the cart in local storage
        localStorage.setItem("cart", JSON.stringify(state.cart));

        },
        [deleteCart.rejected] : (state,action) => {
            state.loading = false;
            state.error = action.payload
        },
        
        //Handling Update Quantity in Cart promise
        [updateQuantity.pending] : (state) => {
            state.loading = true;
        },
        [updateQuantity.fulfilled]: (state, action) => {
            state.loading = false;
            const id = action.payload._id;
            state.cart = state.cart.map((elem) => (elem._id === id ? action.payload : elem));
            // console.log(action.payload);

            const priceArr = state.cart.map((val) => val.price);
            const sum = priceArr.reduce((a,b)=> a+b,0)
            state.cartTotal = sum
            // console.log(state.cart,"sum")

            // Update the cart in local storage
            localStorage.setItem("cart", JSON.stringify(state.cart));
          },
          
        [updateQuantity.rejected] : (state,action) => {
            state.loading = false,
            state.error = action.payload
        },

        // Handling Checkout Promises of Orders
        [checkout.pending] : (state) => {
            state.loading = true
        },
        [checkout.fulfilled] : (state,action) => {
            state.loading = false,
            state.order = action.payload,
            console.log(state.order, "orderState")
        },
        [checkout.rejected] : (state,action) => {
            state.loading = false,
            state.error = action.payload
        },
    }
});

  

export default cartSlice.reducer