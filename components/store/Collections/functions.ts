import axios from "axios";
import { ICollection_NFT, INFTAdditonalInfoPayload, INFTListingsPayload, INFTMetadata, INFT_Detail, OpenSeaBestListing, OpenSeaBestOffer } from "../../../interfaces/Collections";

export const fetchMetadata = async (url: string): Promise<INFTMetadata | null> => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return null;
    }
};
export const fetchAdditionalData = async (payload: INFTAdditonalInfoPayload): Promise<INFT_Detail | null> => {
    try {
        const { data } = await axios.get(`https://api.opensea.io/api/v2/chain/${payload.chain}/contract/${payload.address}/nfts/${payload.identifier}`, {
            headers: {
                "X-API-KEY": "881ec9b5a0e04ed3b5e5dd5ab831d315",
            }
        });
        return data.nft || null;
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return null;
    }
};

export const fetchListingsData = async (payload: INFTListingsPayload): Promise<OpenSeaBestListing | null> => {
    try {
        const { data } = await axios.get(`https://api.opensea.io/api/v2/listings/collection/${payload.collection_slug}/nfts/${payload.identifier}/best`, {
            headers: {
                "X-API-KEY": "881ec9b5a0e04ed3b5e5dd5ab831d315",
            }
        });
        return data;
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return null;
    }
};
export const fetchOfferData = async (payload: INFTListingsPayload): Promise<OpenSeaBestOffer | null> => {
    try {
        const { data } = await axios.get(`https://api.opensea.io/api/v2/offers/collection/${payload.collection_slug}/nfts/${payload.identifier}/best`, {
            headers: {
                "X-API-KEY": "881ec9b5a0e04ed3b5e5dd5ab831d315",
            }
        });
        return data;
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return null;
    }
};




interface IConvertPayload {
    nft: ICollection_NFT,
    chain: string
}

export const normalazedPrice = (value: string, decimals: number) => {
    const normalValue = parseFloat(value) / Math.pow(10, decimals);
    return normalValue.toFixed(2);
}

export const convertOpenSeaToThirdWeb = async ({ nft, chain }: IConvertPayload) => {
    try {
        const additionData = await fetchAdditionalData({ address: nft.contract, identifier: nft.identifier, chain: chain })
        const listings = await fetchListingsData({ collection_slug: nft.collection, identifier: nft.identifier })
        const offer = await fetchListingsData({ collection_slug: nft.collection, identifier: nft.identifier })
        console.log('listings = ', listings)
        console.log('offer = ', offer)
        return {
            metadata: {
                id: additionData?.identifier || nft.identifier,
                uri: nft.metadata_url,
                description: nft.description,
                name: additionData?.name || nft.name,
                image: additionData?.image_url || nft.image_url,
                background_color: null,
                properties: {},
                attributes: additionData?.traits ?? [],
                external_url: additionData?.opensea_url || nft.opensea_url,
                animation_url: additionData?.animation_url || null,
            },
            owner: additionData?.owners ? additionData.owners[0].address : "",
            type: nft.token_standard === "erc721" ? "ERC721" : nft.token_standard === "erc1155" ? "ERC1155" : "metaplex",
            supply: additionData?.rarity ? additionData.rarity?.total_supply : "1",
            quantityOwned: additionData?.owners ? additionData.owners[0].quantity : "",
            listings: listings && listings?.price ? {
                price: normalazedPrice(listings.price.current.value, listings.price.current.decimals),
                currencySymbol: listings.price.current.currency,

            } : {},
            offer: offer && offer?.price ? {
                price: normalazedPrice(offer.price.current.value, offer.price.current.decimals),
                currencySymbol: offer.price.current.currency
            } : {}
        };
    }
    catch (e) {
        console.error(e)
    }

};