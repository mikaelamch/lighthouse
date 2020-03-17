class LocalStorageManagerClass {
    constructor() {
        this.savedOrders = 'savedOrders';
    }
    
    /**
     * Saves a key/value pair in the local storage
     * @param {String} key the key to be saved in the local storage associated with the obj (second input parameter)
     * @param {JSON} obj the object/value associated with the key to be saved in the local storage
     */
    saveToLocal(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj))
    } 
    
    retrieveFromLocal(key) {
        return JSON.parse(localStorage.getItem(key))
    }
}

export default LocalStorageManagerClass;