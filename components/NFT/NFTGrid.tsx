import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import Link from "next/link";
import React from "react";
import { NFT_COLLECTION_ADDRESS } from "../../const/contractAddresses";
import Skeleton from "../Skeleton/Skeleton";
import NFT from "./NFT";
import styles from "../../styles/Buy.module.css";
import CustomNft from "./CustomNft";
import { NormalazedNFTData } from "../../interfaces/Collections";

type Props = {
  isLoading: boolean;
  data: NormalazedNFTData[] | undefined;
  emptyText?: string;
};

export default function NFTGrid({
  isLoading,
  data,
  emptyText = "No NFTs found for this collection.",
}: Props) {
  console.log("isLoading = ", isLoading);
  return (
    <div className={styles.nftGridContainer}>
      {isLoading ? (
        [...Array(20)].map((_, index) => (
          <div key={index} className={styles.nftContainer}>
            <Skeleton key={index} width={"100%"} height="312px" />
          </div>
        ))
      ) : data && data.length > 0 ? (
        data.map((nft) => (
          <Link
            href={`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`}
            key={nft.metadata.id}
            className={styles.nftContainer}
          >
            <CustomNft nft={nft} />
          </Link>
        ))
      ) : (
        <p>{emptyText}</p>
      )}
    </div>
  );
}
