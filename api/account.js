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


