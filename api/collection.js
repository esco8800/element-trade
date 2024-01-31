import axios from 'axios';

class CollectionStats {
    constructor(collectionSlug, floorPrice, bestOffer) {
        this.collectionSlug = collectionSlug;
        this.floorPrice = floorPrice;
        this.bestOffer = bestOffer;
    }
}


export async function fetchCollectionStats(collectionSlug) {
    try {
        const response = await axios.get('https://api.element.market/openapi/v1/collection/stats', {
            headers: {
                'accept': 'application/json'
            },
            params: {
                collection_slug: collectionSlug
            }
        });

        const data = response.data;
        return new CollectionStats(collectionSlug, data.floorPrice, data.collectionBestOffer.bestOfferPriceSource);
    } catch (error) {
        console.error('There was an error!', error);
        throw error;
    }
}
