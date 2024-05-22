import {
    AsyncThunk,
    createAsyncThunk,
    createSelector,
    createSlice,

} from "@reduxjs/toolkit";

import { RootState } from "../store";
import { Collection, ICollection_NFT, NormalazedNFTData } from '../../../interfaces/Collections'
import axios from "axios";
import { convertOpenSeaToThirdWeb } from "./functions";
import { NFT } from "@thirdweb-dev/sdk";


export interface ICollectionsGetPaylod {
    next: string | number;
    limit: number;
    chain?: string;
    creator_username?: string
}
export interface ICollectionGetPaylod {
    collection_slug: string,
    limit: number;
    next: string | number;
    chain: string;
}

export const getCollectionsThunk = createAsyncThunk('ColleactionSlice/GET',
    async (payload: ICollectionsGetPaylod, thunkAPI) => {
        try {
            const { data } = await axios.get(
                `https://api.opensea.io/api/v2/collections`,
                {
                    params: {
                        ...(payload.next !== 0 ? { next: payload.next } : {}),
                        ...(payload.creator_username ? { creator_username: payload.creator_username } : {}),
                        chain: payload.chain,
                        limit: payload.limit
                    },
                    headers: {
                        "X-API-KEY": "881ec9b5a0e04ed3b5e5dd5ab831d315",
                    },
                }
            );
            const filteredCollections = data.collections.filter((oneCol: Collection) => oneCol.contracts.length > 0)
            return { data: { ...data, collections: filteredCollections }, isNext: payload.next !== 0 }
        } catch (e) {
            return thunkAPI.rejectWithValue(null);
        }
    }
)

export const getCollectionNftsThunk = createAsyncThunk('ColleactionSlice/one_collection',
    async (payload: ICollectionGetPaylod, thunkAPI) => {
        try {
            const { data: collectionData } = await axios.get(
                `https://api.opensea.io/api/v2/collection/${payload.collection_slug}/nfts`,
                {
                    params: {
                        limit: payload.limit,
                        ...(payload.next !== 0 ? { next: payload.next } : {}),
                    },
                    headers: {
                        "X-API-KEY": "881ec9b5a0e04ed3b5e5dd5ab831d315",
                    },
                }
            );

            const nfts = await Promise.all(
                collectionData.nfts.map(async (nft: ICollection_NFT) => {
                    return await convertOpenSeaToThirdWeb({ nft, chain: payload.chain });
                })
            );
            console.log('nfts = ', nfts)
            return { data: { ...collectionData, nfts }, isNext: payload.next !== 0 }
        } catch (e) {
            return thunkAPI.rejectWithValue(null);
        }
    }
)

export interface initialStateProps {
    items: Collection[],
    next: string | number,
    loading: boolean,
    collectionLoading: boolean,
    collectionNfts: NormalazedNFTData[],
    nextCollectionNfts: string | number

}

const initialState: initialStateProps = {
    items: [] as Collection[],
    next: 0,
    loading: false,
    collectionNfts: {} as NormalazedNFTData[],
    collectionLoading: false,
    nextCollectionNfts: 0

}

export const ColleactionSlice = createSlice({
    name: "ColleactionSlice",
    initialState,
    reducers: {
        setCollections(state, action) {
            state.items = action.payload
        },
        setCollectionsLoading(state, action) {
            state.loading = action.payload
        },
        setCollectionsNext(state, action) {
            state.next = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCollectionsThunk.pending, (state, action) => {
            state.loading = true
        },
        )
        builder.addCase(getCollectionsThunk.rejected, (state, action) => {
            state.loading = false
            state.items = []
            state.next = 0
        },
        )
        builder.addCase(getCollectionsThunk.fulfilled, (state, action) => {
            state.items = action.payload.isNext ? [...state.items, ...action.payload.data.collections] : action.payload.data.collections
            state.next = action.payload.data.next
            state.loading = false
        },
        )
        builder.addCase(getCollectionNftsThunk.pending, (state, action) => {
            state.collectionLoading = true
        },
        )
        builder.addCase(getCollectionNftsThunk.fulfilled, (state, action) => {
            state.collectionNfts = action.payload.isNext ? [...state.items, ...action.payload.data.nfts] : action.payload.data.nfts
            state.nextCollectionNfts = action.payload.data?.next || 0
            state.collectionLoading = false
        },
        )
    }
});

// actions
export const {
    setCollections,
    setCollectionsLoading,
    setCollectionsNext
} = ColleactionSlice.actions;

// selectors
export const selectCollectionsSlice = (state: RootState) => state.collectionsSlice;
export const selectCollections = createSelector(
    selectCollectionsSlice,
    (s) => s.items
);
export const selectCollectionsLoading = createSelector(selectCollectionsSlice, (s) => s.loading)
export const selectCollectionLoading = createSelector(selectCollectionsSlice, (s) => s.collectionLoading)
export const selectCollectionsNext = createSelector(selectCollectionsSlice, (s) => s.next)
export const selectCollectionNftsNext = createSelector(selectCollectionsSlice, (s) => s.nextCollectionNfts)
export const selectCollectionNfts = createSelector(selectCollectionsSlice, (s) => s.collectionNfts)


export default ColleactionSlice.reducer;