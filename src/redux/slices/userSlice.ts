import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
    value: {
        userId: string,
        companyId: string,
    }
}

const initialState = {
    value: {
        userId: "",
        companyId: "",
    },
} as InitialState;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<{userId: string; companyId: string}>) => {
            state.value = {
                userId: action.payload.userId,
                companyId: action.payload.companyId,
            }
        },
        logoutUser: (state) => {
            state.value = {
                userId: "",
                companyId: "",
            }
        }
    }
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;