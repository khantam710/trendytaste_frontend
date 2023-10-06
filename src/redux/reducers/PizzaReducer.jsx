import { createSlice } from "@reduxjs/toolkit";
import { getPizzas } from "../actions/PizzaAction";


const pizzaSlice = createSlice({
    name:"pizzas",
    initialState: {
        pizzas : [],
        loading : false,
        error : null,
        searchDataState : ""
    },
    reducers : {
        searchPizza: (state,action) => {
            state.searchDataState = action.payload
        }
    },
    extraReducers : {
        // Handling Get Pizza Promises
        [getPizzas.pending] : (state) => {
            state.loading = true;
        },
        [getPizzas.fulfilled] : (state,action) => {
            state.loading = false;
            state.pizzas = action.payload
        },
        [getPizzas.rejected] : (state,action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export default pizzaSlice.reducer;

export const { searchPizza } = pizzaSlice.actions

