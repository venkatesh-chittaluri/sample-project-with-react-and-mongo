import { createSlice,createAsyncThunk, isFulfilled} from '@reduxjs/toolkit';
import { Action } from '@remix-run/router';
import axios from 'axios';

//make http post request to login user  ***thunkApi is usefull when reject status
export const userLogin=createAsyncThunk('loginuser',async(userCredentialsObject,thunkapi)=>{
   
    let response=await axios.post('user-api/login',userCredentialsObject)
    let data=response.data;
    if(data.message==='success'){
       //start token in local storage
       localStorage.setItem("token",data.payload);
       console.log(data.userObj)
       return data.userObj;

    }
    if(data.message==='invalid user'||data.message==='invalid password'){
        return thunkapi.rejectWithValue(data);

    }
})
let userSlice=createSlice({
    name:'user',
    initialState:{
        userObj:{'hjhhj':'hjjjkj'},
        isError:false,
        isSuccess:false,
        errMsg:''
    },
    reducers:{
        clearLoginStatus:(state)=>{
            state.isSuccess=false;
            state.userObj=null;
            state.isError=false;
            state.errMsg='';

        }
    },
    extraReducers:{
        //track life cycle of primose returned by createAsyncThunk functio
        [userLogin.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [userLogin.fulfilled]:(state,action)=>{
            state.userObj=action.payload;
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.errMsg='';
            return state;
        },
        [userLogin.rejected]:(state,action)=>{
           state.isError=true;
           state.isLoading=false;
           state.isSuccess=false;
           //state.errMsg=action.payload.message;
        }
    }
})

//export action creators
export const {}=userSlice.actions;
//export reducer
export default userSlice.reducer;
export const {clearLoginStatus}=userSlice.actions;
