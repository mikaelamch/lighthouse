class MenuItem {
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
        this.wineColor = wineColor;
        this.priceWithVat = priceWithVat;
    }

    _getId() {
        return this.id;
    }
    _getName() {
        return this.name;
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
    _getAllergies() {
        if (this.organic) {

        } else if (this.glutenFree) {

        } else if (this.)
    }
}