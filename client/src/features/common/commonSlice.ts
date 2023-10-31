import { createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import type { RootState } from '../../app/store';

export enum ModalType {
    error,
    success,
}

interface CommonState {
    loading: boolean;
    modal: {
        title: string;
        message: string | ReactNode;
        errorCode?: number;
        type: ModalType;
    } | null;
}

export const initialState: CommonState = {
    loading: false,
    modal: null,
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setModal: (state, action) => {
            state.modal = action.payload;
        },
    },
});

export const { setLoading, setModal } = commonSlice.actions;

export default commonSlice.reducer;

export const selectLoading = (state: RootState) => state.common.loading;
export const selectModal = (state: RootState) => state.common.modal;
