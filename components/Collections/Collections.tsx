import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { useSelector } from "react-redux";
import {
  getCollectionsThunk,
  selectCollections,
  selectCollectionsLoading,
  selectCollectionsNext,
  setCollectionsNext,
} from "../store/Collections/CollectionsSlice";
import Skeleton from "../Skeleton/Skeleton";
import Link from "next/link";
import styles from "../../styles/Buy.module.css";
import { useFormContext } from "react-hook-form-mui";
import OneCollection from "./OneCollection";

const Collections = () => {
  const dispatch = useAppDispatch();
  const collections = useSelector(selectCollections);
  const isLoading = useSelector(selectCollectionsLoading);
  const next = useSelector(selectCollectionsNext);
  const { watch } = useFormContext();
  const chain = watch("chain");
  const search = watch("searchNft");

  useEffect(() => {
    dispatch(
      getCollectionsThunk({
        next: 0,
        limit: 30,
        creator_username: search,
        ...(chain ? { chain: chain.label } : {}),
      })
    );
  }, [chain, search]);
  useEffect(() => {
    dispatch(setCollectionsNext(0));
  }, [chain, search]);

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      // Проверяем, достигли ли конца страницы
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        dispatch(
          getCollectionsThunk({
            next: next,
            limit: 20,
            creator_username: search,
            ...(chain ? { chain: chain.label } : {}),
          })
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);
  console.log("collections - ", collections);
  return (
    <div className={styles.nftGridContainer}>
      {isLoading ? (
        [...Array(20)].map((_, index) => (
          <div key={index} className={styles.nftContainer}>
            <Skeleton key={index} width={"100%"} height="312px" />
          </div>
        ))
      ) : collections.length > 0 ? (
        collections.map((collection) => (
          <Link
            href={`/collection/${collection.name}/${collection.collection}?chain=${collection.contracts[0]?.chain}`}
            key={`collection-${collection.collection}-${collection.name}`}
            className={styles.nftContainer}
          >
            <OneCollection collection={collection} />
          </Link>
        ))
      ) : (
        <p>Collections not exists</p>
      )}
    </div>
  );
};
export default Collections;
