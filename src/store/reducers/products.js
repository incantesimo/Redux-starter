import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_SERV = "http://localhost:3001"



export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async(obj,thunkApi)=>{
        try{            
            const response = await axios.get(`${URL_SERV}/posts`)        
            return response.data            
        } 
        catch(error){
            console.log(error)
            throw error
            return thunkApi.rejectWithValue("Try again")
        } 
    }
)

export  const productsSlice = createSlice({
    name:'products',
    initialState:{
        loading:false,
        items:[
        ],
    },
    reducers:{
        addProduct:(state,action)=>{
            //const newProduct = {id:5,name:"Sony",type:"Car"};
            //console.log(action.payload)
            //state.items = [...state.items, action.payload]
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state)=>{
            console.log("pending")
            state.loading = true
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            console.log("fulfilled")
            state.loading = false
            state.items = action.payload
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading = false
            console.log(action.payload)
        })
    }
})
export const {addProduct} = productsSlice.actions;
export default productsSlice.reducer;