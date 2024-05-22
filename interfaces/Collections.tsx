import { NFT } from "@thirdweb-dev/sdk";

export interface Contract {
  address: string;
  chain: string;
}

export interface Collection {
  collection: string;
  name: string;
  description: string;
  image_url: string;
  banner_image_url: string;
  owner: string;
  safelist_status: string;
  category: string;
  is_disabled: boolean;
  is_nsfw: boolean;
  trait_offers_enabled: boolean;
  collection_offers_enabled: boolean;
  opensea_url: string;
  project_url: string;
  wiki_url: string;
  discord_url: string;
  telegram_url: string;
  twitter_username: string;
  instagram_username: string;
  contracts: Contract[];
}
// Интерфейсы для OpenSea данных
export interface ICollection_NFT {
  identifier: string;
  collection: string;
  contract: string;
  token_standard: string;
  name: string;
  description: string;
  image_url: string;
  metadata_url: string;
  opensea_url: string;
  updated_at: string;
  is_disabled: boolean;
  is_nsfw: boolean;
}
export interface NormalazedNFTData {
  metadata: {
    id: string;
    uri: string;
    description: string;
    name: string;
    image: string;
    background_color: null;
    properties: {};
    attributes: {
      trait_type: string;
      value: string;
    }[];
    external_url: string;
    animation_url: string | null;
  };
  owner: string;
  type: "ERC721" | "ERC1155" | "metaplex";
  supply: string;
  quantityOwned: string;
  listings: {
    price: string;
    currencySymbol: string;
  };
  offer: {
    price: string;
    currencySymbol: string;
  };
}

export interface INFTAdditonalInfoPayload {
  address: string;
  identifier: string;
  chain: string;
}
export interface INFTListingsPayload {
  collection_slug: string;
  identifier: string;
}

// Интерфейсы для OpenSea данных
export interface INFT_Detail extends ICollection_NFT {
  animation_url: string;
  is_suspicious: boolean;
  creator: string;
  traits: Array<{
    trait_type: string;
    display_type?: string;
    max_value?: string;
    value: string | number;
  }>;
  owners: Array<{
    address: string;
    quantity: number;
  }>;
  rarity: {
    strategy_version: string;
    rank: number;
    score: number;
    calculated_at: string;
    max_rank: number;
    total_supply: number;
    ranking_features: {
      unique_attribute_count: number;
    };
  };
}
interface INFTAttribute {
  trait_type: string;
  display_type?: string;
  value: string | number;
}

export interface INFTMetadata {
  id: string;
  name: string;
  image: string;
  external_url: string;
  attributes: INFTAttribute[];
}

export interface OpenSeaBestListing {
  order_hash: string;
  type: any;
  price: {
    current: {
      currency: string;
      decimals: number;
      value: string;
    };
  };
  protocol_data: {
    parameters: {
      offerer: string;
      offer: {
        itemType: number;
        token: string;
        identifierOrCriteria: string;
        startAmount: string;
        endAmount: string;
      }[];
      consideration: {
        itemType: number;
        token: string;
        identifierOrCriteria: string;
        startAmount: string;
        endAmount: string;
        recipient: string;
      }[];
      startTime: string;
      endTime: string;
      orderType: number;
      zone: string;
      zoneHash: string;
      salt: string;
      conduitKey: string;
      totalOriginalConsiderationItems: number;
      counter: number;
    };
    signature: string;
  };
  protocol_address: string;
}

export interface OpenSeaBestOffer {
  offers: {
    order_hash: string;
    chain: any;
    price: {
      currency: string;
      decimals: number;
      value: string;
    };
    criteria: {
      collection: {
        slug: string;
      };
      contract: {
        address: string;
      };
      trait: {
        type: string;
        value: string;
      };
      encoded_token_ids: string;
    };
    protocol_data: {
      parameters: {
        offerer: string;
        offer: {
          itemType: number;
          token: string;
          identifierOrCriteria: string;
          startAmount: string;
          endAmount: string;
        }[];
        consideration: {
          itemType: number;
          token: string;
          identifierOrCriteria: string;
          startAmount: string;
          endAmount: string;
          recipient: string;
        }[];
        startTime: string;
        endTime: string;
        orderType: number;
        zone: string;
        zoneHash: string;
        salt: string;
        conduitKey: string;
        totalOriginalConsiderationItems: number;
        counter: number;
      };
      signature: string;
    };
    protocol_address: string;
  }[];
  next: string;
}

//thirdWeb
export interface NFTMetadata {
  id: string;
  uri: string;
  description?: string | null;
  name?: string | null;
  image?: string | null;
  background_color?: string | null;
  properties?: Record<string, any>;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  external_url?: string | null;
  animation_url?: string | null;
}

export interface NFT_THIRD_WEB {
  nft: NFT;
  contract: string;
}
