import { configureStore } from '@reduxjs/toolkit'
import nftSlice from './NFT/nftSlice'
import collectionsSlice from './Collections/CollectionsSlice'
import metadataSlice from './Metadata/MetadataSlice'

export const store = configureStore({
    reducer: {
        nftSlice,
        collectionsSlice,
        metadataSlice
    },
});

// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;