/**
 * This class represents the structure of an element in the menu. The data is present in ../JSON/DB_Beverages.json, as such the *   * attributes were choses according to what is available in the DB
 * @file MenuItemModel.js
 * @author Alessandra
 */
class MenuItemModel {
    constructor(id, name, category, beverageType, volumeMl, alcoholStrength, organic, glutenFree, lactoseFree, kosher, red, white, priceWithVat) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.beverageType = beverageType;
        this.volumeMl = volumeMl;
        this.alcoholStrength = alcoholStrength;
        this.organic = organic;
        this.glutenFree = glutenFree;
        this.lactoseFree = lactoseFree;
        this.kosher = kosher;
        this.red = red;
        this.white = white;
        this.priceWithVat = priceWithVat;
    }

    // Simple list of getters for each attribute defined in the constructor()
    _getId() {
        return this.id;
    }

    _getName() {
        return this.name;
    }

    _getCategory() {
        return this.category;
    }

    _getBeverageType() {
        return this.beverageType;
    }

    _getVolumeMl() {
        return this.volumeMl;
    }

    _getAlcoholStrength() {
        return this.alcoholStrength;
    }

    /**
     * Gets an array of allergy-free propreties of the beverage
     * @returns {Array<String>} of allergies as strings 
     */
    _getAllergies() {
        let a = [];
        if (this.organic) {
            a.push('organic');
        }
        if (this.glutenFree) {
            a.push('glutenFree');
        }
        if (this.lactoseFree) {
            a.push('lactoseFree');
        }

        return a;
    }

    _getKosher() {
        return this.kosher;
    }

    /**
     * Gets the color of the wine 
     * @returns {String} color of the wine as a string
     * @returns {null} if the beverage has the colors set to 'false' (not a wine)
     */
    _getWineColor() {
        if (this.red) {
            return 'red';
        } else if (this.white) {
            return 'white';
        } else {
            return null;
        }
    }

    _getPriceWithVat() {
        return this.priceWithVat;
    }
}

export default MenuItemModel;