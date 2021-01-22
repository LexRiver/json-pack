/**
 * Store string keys and their short codes
 */
export class KeysMap {
    constructor() {
        this.codeByKey = new Map();
        this.nextIndex = 0;
    }
    has(key) {
        return this.codeByKey.has(key);
    }
    add(key) {
        if (this.has(key))
            throw new Error('already have key ' + key);
        this.codeByKey.set(key, this.nextIndex.toString(36));
        this.nextIndex++;
    }
    get(key) {
        return this.codeByKey.get(key);
    }
    toJsonString() {
        return JSON.stringify([...this.codeByKey]);
    }
    toArray() {
        return [...this.codeByKey];
    }
}
