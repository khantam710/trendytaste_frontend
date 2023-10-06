import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add User
export const registerUser = createAsyncThunk("register", async(payload, {rejectWithValue}) => {
    const response = await axios.post(`http://localhost:5000/user/register`, payload);

    try{
        const result = await response.data;
        console.log(result, "user registered");
        return result;
    }catch(error) {
        return rejectWithValue(error)
    }
})

// export const loginUser = createAsyncThunk("login", async(payload, {rejectWithValue}) => {
//     const response = await axios.post(`http://localhost:5000/user/login`, payload);

//     try{
//         const result = await response.data;
//         console.log(result, "login successful");
//         localStorage.setItem('currentUser', JSON.stringify(response.data))
//         window.location.href = "/"
//         return result
//     }catch(error) {
//         return rejectWithValue(error.response.data)
//     }
// })

export const loginUser = createAsyncThunk("login", async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:5000/user/login`, payload);
      const result = response.data;
      console.log(result, "login successful");
      localStorage.setItem('currentUser', JSON.stringify(result));
      window.location.href = "/";
      return result;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error);
      }
    }
  });
  

export const logoutUser = createAsyncThunk("logout", async(args, {rejectWithValue}) => {
    try{
        localStorage.removeItem('currentUser');
        window.location.href = "/login";
        return null;
    }catch(error) {
        return rejectWithValue(error)
    }
})

