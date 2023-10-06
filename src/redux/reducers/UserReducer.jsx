import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from '../actions/UserAction';

const userSlice = createSlice({
    name:"users",
    initialState: {
        users: [],
        loading: false,
        success: false,
        error: null,
        currentUser: {}
     },
    reducers: {

    },
    extraReducers: {
        // Handling Register User Promises
        [registerUser.pending] : (state) => {
            state.loading=true;
        },
        [registerUser.fulfilled] : (state,action) => {
            state.loading = false,
            state.success = true,
            state.users = [...state.users, action.payload]
            localStorage.setItem("currentuser", JSON.stringify(state))
        },
        [registerUser.rejected] : (state,action) => {
            state.loading =  false,
            state.error =  action.payload;
            console.log(action, "action")
        },

        // Handling Login User Promises
        [loginUser.pending] : (state) => {
            state.loading = true;
        },
        [loginUser.fulfilled] : (state,action) => {
            state.loading = false;
            state.success = true;
            state.currentUser = action.payload;
            console.log(action.payload, "payload");
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser))
        },
        [loginUser.rejected] : (state,action) => {
            state.loading = false;
            state.error = action.payload;
            console.log(action, "action")
        },

        // Handling Logout User Promises
        [logoutUser.pending]: (state) => {
            state.loading = true;
        },
        [logoutUser.fulfilled]: (state) => {
            state.loading = false;
            state.success = true;
            state.currentUser = {};
            localStorage.removeItem("currentUser");
            window.location.href = "/login"
        },
        [logoutUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
          
    }
})

export default userSlice.reducer