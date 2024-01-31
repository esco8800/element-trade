import {fetchCollectionStats} from './api/collection.js';
import {fetchOfferList} from './api/account.js';
import {get, has, set} from './storage.js';

const interval = 5
const percentage = 15
const floorKey = ".floorPrice"
const bestOfferKey = ".bestOffer"

export function startWorker(collectionSlug, collectionContract, chain, walletAddress) {
    setInterval(async () => {
        try {
            const collectionStats = await fetchCollectionStats(collectionSlug);
            const offerList = await fetchOfferList(chain, walletAddress, 1000);
            const currentOffer = findAccountOrderByContractAddress(offerList);
            let oldFloorPrice = 0
            let oldBestOffer = 0

            // Проверка и установка значений
            if (has(collectionStats.collectionSlug + floorKey)) {
                oldFloorPrice = get(collectionStats.collectionSlug + floorKey)
            } else {
                set(collectionStats.collectionSlug + floorKey, collectionStats.floorPrice)
            }

            if (has(collectionStats.collectionSlug + bestOfferKey)) {
                oldBestOffer = get(collectionStats.collectionSlug + bestOfferKey)
            } else {
                set(collectionStats.collectionSlug + bestOfferKey, collectionStats.bestOffer)
            }
            // Проверка установка значений

            // Если нет оферов и флор больше предложения на определенный процент
            if (currentOffer === undefined && isGreaterThanByPercentage(collectionStats.floorPrice, collectionStats.bestOffer, percentage)) {
                // todo Ставим бест офер
            }
            // Если нет оферов  и флор больше предложения на определенный процент

        } catch (error) {
            console.error('Error during fetch:', error);
        }
    }, interval * 1000);
}

function findAccountOrderByContractAddress(accountOrders, contractAddress) {
    return accountOrders.find(order => order.contractAddress === contractAddress);
}

function isGreaterThanByPercentage(a, b, percentage) {
    if (percentage < 0) {
        throw new Error("Процент должен быть положительным числом.");
    }
    const difference = a - b;
    const percentDifference = (difference / b) * 100;
    return percentDifference > percentage;
}


