/**
 * This class represents the structure of an element in the menu. The data is present in ../JSON/DB_Beverages.json, as such the attributes were choses according to what is available in the DB
 * @file MenuItemClass.js
 * @author Alessandra
 */
class MenuItemClass {
    constructor(product) {
        this.id = product.id;
        this.name = product.name;
        this.category = product.category;
        this.beverageType = product.beverageType;
        this.volumeMl = product.volumeMl;
        this.alcoholStrength = product.alcoholStrength;
        this.organic = product.organic;
        this.glutenFree = product.glutenFree;
        this.lactoseFree = product.lactoseFree;
        this.kosher = product.kosher;
        this.red = product.red;
        this.white = product.white;
        this.priceWithVat = product.priceWithVat;
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

    _getOrganic() {
        return this.organic;
    }

    _getGlutenFree() {
        return this.glutenFree;
    }

    _getLactoseFree() {
        return this.lactoseFree;
    }

    _getKosher() {
        return this.kosher;
    }

    _getRed() {
        return this.red;
    }

    _getWhite() {
        return this.white;
    }

    _getPriceWithVat() {
        return this.priceWithVat;
    }

    /**
     * Gets an array of special propreties of the beverage
     * @returns {Array<String>} of special properties as strings. o = organic, g = gluten free, l = lactose free, k = kosher
     */
    _getSpecialProperties() {
        let a = [];
        if (this.organic) {
            a.push('o');
        }
        if (this.glutenFree) {
            a.push('g');
        }
        if (this.lactoseFree) {
            a.push('l');
        }
        if (this.kosher) {
            a.push('k')
        }
        return a;
    }

    /**
     * Gets the color of the wine 
     * @returns {String} color of the wine as a string - r = red, w = white
     * @returns {null} if the beverage has the colors set to 'false' (not a wine)
     */
    _getWineColor() {
        if (this.red) {
            return 'r';
        } else if (this.white) {
            return 'w';
        } else {
            return null;
        }
    }
}

export default MenuItemClass;