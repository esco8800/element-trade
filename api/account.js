import axios from 'axios';

export async function fetchOrderList(chain, walletAddress, limit) {
    try {
        const response = await axios.get('https://api.element.market/openapi/v1/account/orderList', {
            headers: {
                'accept': 'application/json'
            },
            params: {
                chain: chain,
                wallet_address: walletAddress,
                limit: limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('There was an error!', error);
        throw error;
    }
}

// todo потестить какой статус нужно кидать, чтобы получить нфт не в продаже
const status = "";
/**
 *
 * @returns {Array<Asset>|undefined}
 */
export async function fetchAssetList(walletAddress, chain, collection_slug, limit = 1000) {
    try {
        const response = await axios.get('https://api.element.market/openapi/v1/account/assetList', {
            headers: {
                'accept': 'application/json'
            },
            params: {
                chain: chain,
                wallet_address: walletAddress,
                collection_slug: collection_slug,
                status: status,
                limit: limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching asset list:', error);
        throw error;
    }
}

class Asset {
    constructor(asset) {
        this.chain = asset.chain;
        this.chainId = asset.chainId;
        this.contractAddress = asset.contractAddress;
        this.tokenId = asset.tokenId;
        this.tokenType = asset.tokenType;
        this.name = asset.name;
        this.imagePreviewUrl = asset.imagePreviewUrl;
        this.animationUrl = asset.animationUrl;
        this.collection = new Collection(asset.collection);
    }
}

class Collection {
    constructor(collection) {
        this.name = collection.name;
        this.slug = collection.slug;
        this.royalty = collection.royalty;
        this.imageUrl = collection.imageUrl;
        this.isVerified = collection.isVerified;
    }
}

/**
 *
 * @param response
 * @returns {Array<Asset>|undefined}
 */
function parseAssetListResponse(response) {
    return  response.data.assetList.map(assetData => new Asset(assetData.asset));
}


/**
 *
 * @returns {Array<AccountOrder>|undefined}
 */
export async function fetchOfferList(chain, walletAddress, limit) {
    try {
        const response = await axios.get('https://api.element.market/openapi/v1/account/offerList', {
            headers: {
                'accept': 'application/json'
            },
            params: {
                chain: chain,
                wallet_address: walletAddress,
                limit: limit
            }
        });
        return parseOfferListResponse(response.data);
    } catch (error) {
        console.error('There was an error!', error);
        throw error;
    }
}

/**
 *
 * @param response
 * @returns {Array<AccountOrder>|undefined}
 */
function parseOfferListResponse(response) {
    return response.data.assetList.map(item => {
        const accountOrder = new AccountOrder(item.orderData);
        return accountOrder;
    });
}

class AccountOrder {
    constructor(accountOrder) {
        this.chain = accountOrder.chain;
        this.chainId = accountOrder.chainId;
        this.expirationTime = accountOrder.expirationTime;
        this.listingTime = accountOrder.listingTime;
        this.maker = accountOrder.maker;
        this.taker = accountOrder.taker;
        this.side = accountOrder.side;
        this.saleKind = accountOrder.saleKind;
        this.paymentToken = accountOrder.paymentToken;
        this.quantity = accountOrder.quantity;
        this.priceUSD = accountOrder.priceUSD;
        this.price = accountOrder.price;
        this.standard = accountOrder.standard;
        this.contractAddress = accountOrder.contractAddress;
        this.tokenId = accountOrder.tokenId;
        this.schema = accountOrder.schema;
        this.extra = accountOrder.extra;
    }
}


