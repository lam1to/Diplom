import {
    AsyncThunk,
    createAsyncThunk,
    createSelector,
    createSlice,

} from "@reduxjs/toolkit";

import { RootState } from "../store";
import { Collection } from '../../../interfaces/Collections'
import axios from "axios";



export const getChains = createAsyncThunk('MetadataSlice/get_chain',
    async (_, thunkAPI) => {
        try {
            return [
                { id: 0, label: 'ethereum' },
                { id: 1, label: 'zora' },
                { id: 2, label: 'solana' },
                { id: 3, label: 'matic' },
                // { id: 4, label: 'mumbai' },
                { id: 5, label: 'optimism' },
                { id: 6, label: 'base' },
                { id: 7, label: 'arbitrum' },
                // { id: 8, label: 'amoy' },
                { id: 9, label: 'arbitrum_nova' },
                // { id: 10, label: 'arbitrum_sepolia' },
                { id: 11, label: 'avalanche' },
                // { id: 12, label: 'baobab' },
                // { id: 13, label: 'base_sepolia' },
                { id: 14, label: 'blast' },
                // { id: 15, label: 'blast_sepolia' },
                // { id: 16, label: 'bsc' },
                // { id: 17, label: 'bsctestnet' },
                { id: 18, label: 'klaytn' },
                // { id: 19, label: 'optimism_sepolia' },
                // { id: 20, label: 'sepolia' },
                // { id: 21, label: 'soldev' },
                // { id: 22, label: 'zora_sepolia' },
            ]
        } catch (e) {
            return thunkAPI.rejectWithValue(null);
        }
    }
)

export interface IChain {
    id: number;
    label: string
}

export interface initialStateProps {
    chains: IChain[]
    loading: boolean
}

const initialState: initialStateProps = {
    chains: [] as IChain[],
    loading: false
}

export const MetadataSlice = createSlice({
    name: "MetadataSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getChains.pending, (state, action) => {
            state.loading = true
        },
        )
        builder.addCase(getChains.fulfilled, (state, action) => {
            state.chains = action.payload
            state.loading = false
        },
        )
    }
});

// actions
export const {

} = MetadataSlice.actions;

// selectors
export const selectMetadataSlice = (state: RootState) => state.metadataSlice;
export const selectChains = createSelector(
    selectMetadataSlice,
    (s) => s.chains
);
export const selectChainsLoading = createSelector(selectMetadataSlice, (s) => s.loading)


export default MetadataSlice.reducer;