let sharedData = new Map();

export function set(key, value) {
    sharedData.set(key, value);
}

export function get(key) {
    return sharedData.get(key);
}

export function remove(key) {
    sharedData.delete(key);
}

export function has(key) {
    sharedData.has(key);
}