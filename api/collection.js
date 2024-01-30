import axios from 'axios';

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
        return response.data.floorPrice;
    } catch (error) {
        console.error('There was an error!', error);
        return 0;
    }
}
