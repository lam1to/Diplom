import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import React from "react";
import styles from "./NFT.module.css";
import { NormalazedNFTData } from "../../interfaces/Collections";

type Props = {
  nft: NormalazedNFTData;
};

export default function CustomNft({ nft }: Props) {
  return (
    <>
      <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} />
      <p className={styles.nftTokenId}>Token ID #{nft.metadata.id}</p>
      <p className={styles.nftName}>{nft.metadata.name}</p>

      <div className={styles.priceContainer}>
        {Object.keys(nft.listings).length !== 0 ? (
          <div className={styles.nftPriceContainer}>
            <div>
              <p className={styles.nftPriceLabel}>Price</p>
              <p className={styles.nftPriceValue}>
                {`${nft.listings.price} ${nft.listings.currencySymbol}`}
              </p>
            </div>
          </div>
        ) : Object.keys(nft.offer).length !== 0 ? (
          <div className={styles.nftPriceContainer}>
            <div>
              <p className={styles.nftPriceLabel}>Offer</p>
              <p className={styles.nftPriceValue}>
                {`${nft.offer.price} ${nft.offer.currencySymbol}`}
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.nftPriceContainer}>
            <div>
              <p className={styles.nftPriceLabel}>Price</p>
              <p className={styles.nftPriceValue}>Not available</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
