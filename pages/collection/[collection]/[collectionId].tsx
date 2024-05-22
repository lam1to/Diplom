import { Box } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../../../components/store/hooks";
import { useSelector } from "react-redux";
import {
  getCollectionNftsThunk,
  selectCollectionLoading,
  selectCollectionNfts,
  selectCollectionNftsNext,
} from "../../../components/store/Collections/CollectionsSlice";
import { useParams } from "next/navigation";
import NFTGrid from "../../../components/NFT/NFTGrid";
import { useRouter } from "next/router";

const Test = () => {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { collectionId, chain } = route.query;
  //   const collectionId = "";
  const nfts = useSelector(selectCollectionNfts);
  const isLoading = useSelector(selectCollectionLoading);
  const next = useSelector(selectCollectionNftsNext);
  const currentCurrentId = useMemo(() => {
    return typeof collectionId === "string"
      ? collectionId
      : collectionId
      ? collectionId[0]
      : "";
  }, [collectionId]);
  const currentChain = useMemo(() => {
    return typeof chain === "string" ? chain : chain ? chain[0] : "";
  }, [chain]);
  useEffect(() => {
    if (currentCurrentId)
      dispatch(
        getCollectionNftsThunk({
          chain: currentChain,
          collection_slug: currentCurrentId,
          next: 0,
          limit: 20,
        })
      );
  }, [currentCurrentId]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (isLoading) return;

  //     const { scrollTop, scrollHeight, clientHeight } =
  //       document.documentElement;

  //     // Проверяем, достигли ли конца страницы
  //     if (scrollTop + clientHeight >= scrollHeight - 5) {
  //       dispatch(
  //         getCollectionNftsThunk({
  //           chain: currentChain,
  //           collection_slug: currentCurrentId,
  //           next: next,
  //           limit: 30,
  //         })
  //       );
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isLoading]);

  return (
    <Box sx={{ marginTop: "150px" }}>
      <NFTGrid isLoading={isLoading} data={nfts} />
    </Box>
  );
};
export default Test;
