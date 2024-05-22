import { useContract, useNFTs } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import { Box, CircularProgress, Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form-mui";
import BuyHeader from "../components/Buy/BuyHeader";
import { useSelector } from "react-redux";
import {
  getCollectionsThunk,
  selectCollections,
  selectCollectionsLoading,
} from "../components/store/Collections/CollectionsSlice";
import axios from "axios";
import { useAppDispatch } from "../components/store/hooks";
import Collections from "../components/Collections/Collections";

export default function Buy() {
  const form = useForm({
    defaultValues: {
      collection: null,
      chain: null,
    },
    mode: "onChange",
  });
  // useEffect(() => {
  //   if (collections.length === 0) return;
  //   const fetch = async () => {
  //     try {
  //       if (collectionWatch) {
  //         const { data } = await axios.get(
  //           `https://api.opensea.io/api/v2/collection/${collectionWatch.id}/nfts`,
  //           {
  //             headers: {
  //               "X-API-KEY": "881ec9b5a0e04ed3b5e5dd5ab831d315",
  //             },
  //           }
  //         );
  //         console.log("data = ", data);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   fetch();
  // }, [collections, collectionWatch]);
  return (
    <Container sx={{ marginTop: "142px" }} maxWidth="lg">
      <FormProvider {...form}>
        <BuyHeader />
        <Box sx={{ marginTop: "20px" }}>
          <Collections />
        </Box>
      </FormProvider>
    </Container>
  );
}
