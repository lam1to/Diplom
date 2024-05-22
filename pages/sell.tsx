import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from '@thirdweb-dev/react';
import React, { useState } from 'react';
import Container from '../components/Container/Container';
import NFTGrid from '../components/NFT/NFTGrid';
import { NFT_COLLECTION_ADDRESS } from '../const/contractAddresses';
import tokenPageStyles from '../styles/Token.module.css';
import { NFT as NFTType } from '@thirdweb-dev/sdk';
import SaleInfo from '../components/SaleInfo/SaleInfo';
import { useAppSelector } from '../components/store/hooks';
import { selectMyNfts } from '../components/store/NFT/nftSlice';
import SellCard from '../components/SellCard';
import st from '../styles/SellCard.module.css';

export default function Sell() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();
  const { data, isLoading } = useOwnedNFTs(contract, address);

  const [selectedNft, setSelectedNft] = useState<NFTType>();
  const myNft = useAppSelector(selectMyNfts);
  console.log('my = ', myNft);
  return (
    <Container maxWidth="lg">
      <h1>Sell NFTs</h1>
      {myNft && (
        <div className={st.container_card}>
          {myNft.map((oneItem, i) => (
            <SellCard key={i} {...oneItem} i={i} nameNFT={oneItem.nameNFT} />
          ))}
        </div>
      )}
      {/* {!selectedNft ? (
        <>
          <p>Select which NFT you&rsquo;d like to sell below.</p>
          {/* <img src={`/images/1703625957756_digital_transformation.png`} /> 

          {myNft && myNft[0] && myNft[0].file && (
            <img src={`/images/${myNft[0].file}`} />
            // ${myNft[0].file}
          )}

          <NFTGrid
            data={data}
            isLoading={isLoading}
            overrideOnclickBehavior={(nft) => {
              setSelectedNft(nft);
            }}
            emptyText={
              "Looks like you don't own any NFTs in this collection. Head to the buy page to buy some!"
            }
          />
        </>
      ) : (
        <div className={tokenPageStyles.container} style={{ marginTop: 0 }}>
          <div className={tokenPageStyles.metadataContainer}>
            <div className={tokenPageStyles.imageContainer}>
              <ThirdwebNftMedia
                metadata={selectedNft.metadata}
                className={tokenPageStyles.image}
              />
              <button
                onClick={() => {
                  setSelectedNft(undefined);
                }}
                className={tokenPageStyles.crossButton}
              >
                X
              </button>
            </div>
          </div>
          <div className={tokenPageStyles.listingContainer}>
            <p>You&rsquo;re about to list the following item for sale.</p>
            <h1 className={tokenPageStyles.title}>
              {selectedNft.metadata.name}
            </h1>
            <p className={tokenPageStyles.collectionName}>
              Token ID #{selectedNft.metadata.id}
            </p>

            <div className={tokenPageStyles.pricingContainer}>
              <SaleInfo nft={selectedNft} />
            </div>
          </div>
        </div>
      )} */}
    </Container>
  );
}
