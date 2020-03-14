/**
 * This class acts as a mediator between the database and the rest of the system.
 * @file DatabaseCRUDClass.js
 * @author Alessandra
 */
const DATABASE_PATH = "JSON/DB_Beverages.json";

class DatabaseCRUDClass {
    constructor() {
        this.databasePath = DATABASE_PATH;
        this.dbJSON = this.load();
    }

    /**
     * This method will load the database, which means it will transform it in a json
     * @returns a json with the database
     * @returns {null} if the database could not be loaded (e.g. not found)
     */
    load() {
        var json = null; 
        $.ajax({
            async: false,
            type: "GET",
            url: this.databasePath,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    }

    _getDbJSON() {
        return this.dbJSON;
    }

    /**
     * This getter allows to get a complete object from the database.
     * @param {Number} i the key of the specific object in the json
     * @returns {Object} an object with all the data taken from the database for a single item (picked through the id i - the input parameter) 
     */
    _getSingleProduct(i) {
        return {
            id: this.dbJSON[i].id, 
            packaging: this.dbJSON[i].packaging,
            volumeMl: this.dbJSON[i].volumeMl,
            pricePerLitre: this.dbJSON[i].pricePerLitre,
            stockQuantity : this.dbJSON[i].stockQuantity,
            stockQuantityMl: this.dbJSON[i].stockQuantityMl,
            beverageType: this.dbJSON[i].beverageType,
            name: this.dbJSON[i].name,
            category: this.dbJSON[i].category,
            priceWithVat: this.dbJSON[i].priceWithVat,
            introduced: this.dbJSON[i].introduced,
            countryOfOrigin: this.dbJSON[i].countryOfOrigin,
            producer: this.dbJSON[i].producer,
            provider: this.dbJSON[i].provider,
            productionYear: this.dbJSON[i].productionYear,
            alcoholStrength: this.dbJSON[i].alcoholStrength,
            organic: this.dbJSON[i].organic,
            glutenFree: this.dbJSON[i].glutenFree,
            lactoseFree: this.dbJSON[i].lactoseFree,
            kosher: this.dbJSON[i].kosher,
            red: this.dbJSON[i].red,
            white: this.dbJSON[i].white,
            lastDelivery: this.dbJSON[i].lastDelivery 
        };
    }
}

export default DatabaseCRUDClass;