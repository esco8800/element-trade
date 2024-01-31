import {fetchCollectionStats} from './api/collection.js';
import {fetchOfferList, fetchAssetList} from './api/account.js';
import WorkerInterface from './ElementServiceInterface.js';

const interval = 5
const percentageDiff = 15
const percentageIncrease = 15
const floorKey = ".floorPrice"
const bestOfferKey = ".bestOffer"

export function startWorker(service, collectionSlug, collectionContract, chain, walletAddress) {
    if (!(service instanceof WorkerInterface)) {
        throw new Error("Invalid service");
    }

    setInterval(async () => {
        try {
            const collectionStats = await fetchCollectionStats(collectionSlug);
            const offerList = await fetchOfferList(chain, walletAddress, 1000);
            const currentOffer = findAccountOrderByContractAddress(offerList, collectionContract);
            const myNfts = fetchAssetList(walletAddress, chain, collectionSlug, 1000)

            // Если нет оферов и флор больше предложения на определенный процент
            if (currentOffer === undefined && isGreaterThanByPercentage(collectionStats.floorPrice, collectionStats.bestOffer, percentageDiff)) {
                // todo надо понять что имелось ввиду под ассет адресом
                service.makeBuyOrder(collectionContract, increaseByPercent(collectionStats.bestOffer, percentageIncrease))
            }
            // Если нет оферов  и флор больше предложения на определенный процент

            // Если офер существует и лучший офер больше нашего
            if (currentOffer !== undefined && collectionStats.bestOffer > currentOffer.price) {
                // todo отменяем старый и ставим новый лучший офер
                service.cancelOrder()
                service.makeBuyOrder(collectionContract, increaseByPercent(collectionStats.bestOffer, percentageIncrease))
            }
            // Если офер существует и лучший офер больше нашего

            // Если есть нфт ставим по флору
            if (myNfts !== undefined) {
                myNfts.forEach(nft => {
                    service.makeSellOrder(nft.contractAddress, nft.tokenId, collectionStats.floorPrice)
                });
            }
            // Если есть нфт ставим по флору

            // Если есть нфт на продаже и цена меньше флора - меняем цену на цену флора
            // todo берем нфт в продаже и меняем цену
            // Если есть нфт на продаже и цена меньше флора - меняем цену на цену флора

        } catch (error) {
            console.error('Error during fetch:', error);
        }
    }, interval * 1000);
}

/**
 *
 * @returns {AccountOrder|undefined}
 */
function findAccountOrderByContractAddress(accountOrders, contractAddress) {
    return accountOrders.find(order => order.contractAddress === contractAddress);
}

function increaseByPercent(value, percentage) {
    let percentageValue = (value * percentage) / 100;
    return value + percentageValue
}

function isGreaterThanByPercentage(a, b, percentage) {
    if (percentage < 0) {
        throw new Error("Процент должен быть положительным числом.");
    }
    const difference = a - b;
    const percentDifference = (difference / b) * 100;
    return percentDifference > percentage;
}


