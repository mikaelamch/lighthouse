/**
 * This is the class responsable for saving/retrieving data to/from the local storage
 * It also contains the keys that are currently being used throughout the program
 * @file LocalStorageManagerClass.js
 * @author Alessandra
 */
class LocalStorageManagerClass {
    constructor() {
        this.savedOrders = 'savedOrders';
        this.disabledItems = 'disabledItems';
    }
    
    /**
     * This method saves a key/value pair in the local storage
     * @param {String} key the key to be saved in the local storage associated with the obj (second input parameter)
     * @param {JSON} obj the object/value associated with the key to be saved in the local storage
     */
    saveToLocal(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj))
    } 
    
    /**
     * This method retrieves the value associated to the key used as input parameter
     * @param {String} key the key from which we want to retrieve the value 
     */
    retrieveFromLocal(key) {
        return JSON.parse(localStorage.getItem(key))
    }
}

export default LocalStorageManagerClass;