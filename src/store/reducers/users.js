import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const URL_SERV = "http://localhost:3001"


export const fetchUsers =createAsyncThunk(
    'users/fetchUsers',
    async(num,thunkApi)=>{
        console.log(thunkApi.getState())
        const res = await axios.get(`${URL_SERV}/posts/${num}`)
        .then(res => res.data)
        return res
    }
);

export  const usersSlice = createSlice({
    name:'users',
    initialState:{
        
        users:[],
    },
    reducers:{
        getUser:(state,action)=>{
           axios.get(`${URL_SERV}/posts`)
           .then((res)=>{            
            //state.users = [res.data]
            console.log(res.data)
           }).catch((error)=>{
            console.log(error)
           })
        },
    },
    extraReducers:(builder)=> {
        builder
        .addCase(fetchUsers.pending,(state)=>{
            console.log("pending")
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            console.log("fulfilled")
            console.log(action.payload)
            state.users = action.payload
        })
        .addCase(fetchUsers.rejected,(state)=>{
            console.log("rejected")
        })
    }
})
export const {getUser} = usersSlice.actions;
export default usersSlice.reducer;