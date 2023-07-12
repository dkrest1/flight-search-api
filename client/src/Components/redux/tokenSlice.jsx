import { createSlice } from '@reduxjs/toolkit' 
import Cookies from 'js-cookie'

const initialState = { token : Cookies.get('token') || null}

export const tokenSlice = createSlice({
    name: 'accessToken',
    initialState,
    reducers: {
        getToken: (state, action)=>{
            state.token = action.payload
        },
    }
})

export const accesstoken =(state)=> state.token.token
export const {getToken} = tokenSlice.actions
export default tokenSlice.reducer 