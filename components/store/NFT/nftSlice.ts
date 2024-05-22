import {


    createSelector,
    createSlice,

} from "@reduxjs/toolkit";

import { RootState } from "../store";

export interface myNft {
    nameNFT: string,
    file: string,
    description: string,
    price: number
}
export interface initialStateProps {
    myNfts: myNft[]
}

const initialState: initialStateProps = {
    myNfts: [] as myNft[]
}

export const nftSlice = createSlice({
    name: "NFT",
    initialState,
    reducers: {
        setMyNft: (state, action) => {
            console.log('action = ', action)
            console.log('state = ', state.myNfts)
            state.myNfts = [...state.myNfts, action.payload]
        }
    }
});

// actions
export const {
    setMyNft
} = nftSlice.actions;

// selectors
export const selectNftSlice = (state: RootState) => state.nftSlice;
export const selectMyNfts = createSelector(
    selectNftSlice,
    (s) => s.myNfts
);


export default nftSlice.reducer;