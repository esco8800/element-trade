import {fetchCollectionStats} from './api/collection.js';
import { set, get, remove, has } from './storage.js';

export function startWorker(collectionSlug) {
    setInterval(async () => {
        try {
            const data = await fetchCollectionStats(collectionSlug);
            console.log('Data fetched:', data);
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    }, 5000); // 5000 миллисекунд = 5 секунд
}
