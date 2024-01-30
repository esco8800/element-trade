import { ElementSDK, Network } from 'element-js-sdk'
import { ethers } from 'ethers'
import config from './config.js';

// https://docs.ethers.io/v5/api/signer/
const jsonRpcProvider = new ethers.providers.JsonRpcProvider(config.rpcStarkUrl);
const signerOrProvider = new ethers.Wallet(config.privateKey, jsonRpcProvider);

const sdk = new ElementSDK({
    // Supported networks: Network.ETH, Network.BSC, Network.Polygon, Network.Avalanche
    networkName: Network.ETH,
    isTestnet: false,
    apiKey: config.elementMarketAPIKey,
    signer: signerOrProvider
});

const orders = await sdk.queryOrders({
    asset_contract_address: '0xd077bd42b79eB45F6eC24d025c6025B9749215CE',
    payment_token: NULL_ADDRESS,
})