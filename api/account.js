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
        return 0
    }
}

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
        return response.data;
    } catch (error) {
        console.error('There was an error!', error);
        return 0
    }
}
