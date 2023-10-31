import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from './authService';
import type { RootState } from '../../app/store';
import getError from '../../utils/getError';

// Get user from localStorage
const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

const initialState = {
    userInfo: user || null,
};

// Register user
export const register = createAsyncThunk(
    'auth/register',
    async (signUpData: any, thunkAPI) => {
        try {
            return await authService.register(signUpData);
        } catch (error) {
            // const message = getError(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Login user
export const login = createAsyncThunk(
    'auth/login',
    async (loginData: any, thunkAPI) => {
        try {
            return await authService.login(loginData);
        } catch (error) {
            // const message = getError(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        const response = await authService.logout();
    } catch (error) {
        console.log(error);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // reset: (state) => {
        //     state.isLoading = false;
        //     state.isSuccess = false;
        //     state.isError = false;
        //     state.message = '';
        // },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(register.pending, (state) => {
            //     state.isLoading = true;
            // })
            .addCase(
                register.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.userInfo = action.payload;
                }
            )
            .addCase(register.rejected, (state, action: any) => {
                state.userInfo = null;
            })
            // .addCase(login.pending, (state) => {
            //     state.isLoading = true;
            // })
            .addCase(login.fulfilled, (state, action) => {
                state.userInfo = action.payload;
            })
            .addCase(login.rejected, (state, action: any) => {
                state.userInfo = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.userInfo = null;
            });
    },
});

export const selectUserInfo = (state: RootState) => state.auth.userInfo;

// export const { reset } = authSlice.actions;
export default authSlice.reducer;
