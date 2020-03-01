/**
* @file This file contains the database of the beverages in the form of an Array of JavaScript Objects
* @author Alessandra
*
* The JavaScript Objects originally present in the provided DB have been modified. The current structure of a beverage object is:
*
* id: {Number} unique id for each beverage
* packaging: {String} container available for the bevarage (bottle/can/tap)
* volumeMl: {Number | null} only if packaging is "bottle"/"can", otherwise null
* pricePerLitre: {Number | null} only if packaging is "tap", otherwise null
* stockQuantity: {Number | null} only if packaging is "bottle"/"can" - quantity left in the stock - otherwise null
* stockQuantityMl: {Number | null} only if packaging is "tap" - quantity left in the stock - otherwise null
* beverageType: {String} type of beverage (beer/wine/cocktail/non-alcoholic)
* name: {String} name of the beverage
* category: {String} further details regarding the category of the beverage
* priceWithVat: {Number} price in SEK (:-) of the beverage with tax
* introduced: {Date} the date the beverage was put on the market
* countryOfOrigin: {String} name of the country of origin
* producer: {String} name of the producer
* provider: {String} name of the provider in Sweden
* productionYear: {Date | null} year of production, otherwise null
* alcoholStrength: {Number} percentage (%) of alcohol in the beverage
* organic: {Boolean}
* glutenFree: {Boolean}
* lactoseFree: {Boolean}
* kosher: {Boolean}
* red: {Boolean} true - only if red wine
* white: {Boolean} true - only if white wine
* lastDelivery: {Date} last received delivery
*
*/
[
    // BEERS (4)
    {
        "id": 1,
        "packaging": "bottle",
        "volumeMl": 330,
        "pricePerLitre": null,
        "stockQuantity" : 100,
        "stockQuantityMl": null,
        "beverageType": "beer",
        "name": "Heineken",
        "category": "Ljus lager",
        "priceWithVat": 13.90,
        "introduced": new Date(1992, 4, 21),
        "countryOfOrigin": "Netherlands",
        "producer": "Spendrups",
        "provider": "Spendrups Bryggeri AB",
        "productionYear": null,
        "alcoholStrength": 5,
        "organic": false,
        "glutenFree": false,
        "lactoseFree": false,
        "kosher": false,
        "red": false,
        "white": false,
        "lastDelivery": new Date(2020, 1, 11)
    },
    {
        "id": 2,
        "packaging": "bottle",
        "volumeMl": 330,
        "pricePerLitre": null,
        "stockQuantity" : 50,
        "stockQuantityMl": null,
        "beverageType": "beer",
        "name": "Peroni Nastro Azzurro",
        "category": "",
        "priceWithVat": 15.90,
        "introduced":new Date(2008, 8, 6),
        "countryOfOrigin": "Italy",
        "producer": "Birra Peroni",
        "provider": "SAB Miller Brands Europe AS Tj",
        "productionYear": null,
        "alcoholStrength": 5.1,
        "organic": false,
        "glutenFree": false,
        "lactoseFree": false,
        "kosher": false,
        "lastDelivery": new Date(2019, 12, 3)
    },
    {
        "id": 3, 
        "packaging": "bottle",
        "volumeMl": 500,
        "pricePerLitre": null,
        "stockQuantity" : 78,
        "stockQuantityMl": null,
        "beverageType": "beer",
        "name": "Bombardier",
        "category": "",
        "priceWithVat": 20.90,
        "introduced": new Date(2008, 10, 1),
        "countryOfOrigin": "England",
        "producer": "Wells & Young's Brewing Compan",
        "provider": "TOMP Beer Wine & Spirits AB",
        "productionYear": null,
        "alcoholStrength": 5.2,
        "organic": false,
        "glutenFree": false,
        "lactoseFree": false,
        "kosher": false,
        "lastDelivery": new Date(2019, 11, 29)
    },
    {
        "id": 4, 
        "packaging": "bottle",
        "volumeMl": 330,
        "pricePerLitre": null,
        "stockQuantity" : 58,
        "stockQuantityMl": null,
        "beverageType": "beer",
        "name": "Green's Dark",
        "category": "",
        "priceWithVat": 26.50,
        "introduced": new Date(2013, 9, 2),
        "countryOfOrigin": "Belgien",
        "producer": "Green's Gluten Free Beers",
        "provider": "Winemarket Nordic AB",
        "productionYear": null,
        "alcoholStrength": 5.8,
        "organic": false,
        "glutenFree": true,
        "lactoseFree": false,
        "kosher": false,
        "lastDelivery": new Date(2019, 11, 3)
    },
    // WINES (2)
    {
        "id": 5, 
        "packaging": "bottle",
        "volumeMl": 750,
        "pricePerLitre": null,
        "stockQuantity" : 10,
        "stockQuantityMl": null,
        "beverageType": "wine",
        "name": "Lupi Reali",
        "category": "Montepulciano d'Abruzzo",
        "priceWithVat": 69,
        "introduced": new Date(2013, 4, 2),
        "countryOfOrigin": "Italy",
        "producer": "Enoitalia",
        "provider": "The WineAgency Sweden AB",
        "productionYear": new Date(2013),
        "alcoholStrength": 12.5,
        "organic": true,
        "glutenFree": true,
        "lactoseFree": true,
        "kosher": false,
        "red": true,
        "white": false,
        "lastDelivery": new Date(2020, 2, 13)
    },
    {
        "id": 6, 
        "packaging": "bottle",
        "volumeMl": 750,
        "pricePerLitre": null,
        "stockQuantity" : 10,
        "stockQuantityMl": null,
        "beverageType": "wine",
        "name": "Hafner",
        "category": "Chardonnay",
        "priceWithVat": 119,
        "introduced": new Date(2004, 3, 15),
        "countryOfOrigin": "Burgenland, Lake Neusiedl",
        "producer": "Hafner",
        "provider": "Haugen-Gruppen AB",
        "productionYear": new Date(2011),
        "alcoholStrength": 13,
        "organic": false,
        "glutenFree": true,
        "lactoseFree": true,
        "kosher": false,
        "red": false,
        "white": true,
        "lastDelivery": new Date(2020, 1, 12)
    },
    // COCKTAILS (2)
    {
        "id": 7, 
        "packaging": "bottle",
        "volumeMl": 180,
        "pricePerLitre": null,
        "stockQuantity" : 10,
        "stockQuantityMl": null,
        "beverageType": "cocktail",
        "name": "Znaps",
        "category": "Strawberry Daiquiri",
        "priceWithVat": 160,
        "introduced": new Date(2013, 6, 1),
        "countryOfOrigin": "Sweden",
        "producer": "Znaps Sweden AB",
        "provider": "Znaps Sweden AB",
        "productionYear": null,
        "alcoholStrength": 15,
        "organic": false,
        "glutenFree": false,
        "lactoseFree": false,
        "kosher": false,
        "red": false,
        "white": false,
        "lastDelivery": new Date(2019, 12, 12) 
    },
    {
        "id": 8, 
        "packaging": "bottle",
        "volumeMl": 180,
        "pricePerLitre": null,
        "stockQuantity" : 10,
        "stockQuantityMl": null,
        "beverageType": "cocktail",
        "name": "Evil Twin",
        "category": "Molotov Cocktail Imperial India Pale Ale",
        "priceWithVat": 50.60,
        "introduced": new Date(2013, 10, 1),
        "countryOfOrigin": "Sweden",
        "producer": "Evil Twin Brewing",
        "provider": "Galatea Spirits AB",
        "productionYear": null,
        "alcoholStrength": 13,
        "organic": false,
        "glutenFree": false,
        "lactoseFree": false,
        "kosher": false,
        "red": false,
        "white": false,
        "lastDelivery": new Date(2019, 12, 12) 
    },
    // NON-ALCOHOLIC DRINKS
    {
        "id": 9, 
        "packaging": "can",
        "volumeMl": 330,
        "pricePerLitre": null,
        "stockQuantity" : 79,
        "stockQuantityMl": null,
        "beverageType": "non-alcoholic",
        "name": "Coca-Cola Original",
        "category": "",
        "priceWithVat": 50.60,
        "introduced": new Date(1886, 8, 5),
        "countryOfOrigin": "USA",
        "producer": "Coca-Cola Company",
        "provider": "Coca-Cola AB",
        "productionYear": null,
        "alcoholStrength": 0,
        "organic": false,
        "glutenFree": true,
        "lactoseFree": true,
        "kosher": false,
        "red": false,
        "white": false,
        "lastDelivery": new Date(2019, 12, 12) 
    },
    {
        "id": 10, 
        "packaging": "bottle",
        "volumeMl": 630,
        "pricePerLitre": null,
        "stockQuantity" : 18,
        "stockQuantityMl": null,
        "beverageType": "non-alcoholic",
        "name": "Maglehem",
        "category": "Must",
        "priceWithVat": 21.90,
        "introduced": new Date(2014, 3, 1),
        "countryOfOrigin": "Sweden",
        "producer": "Maglehems musteri",
        "provider": "Maglehems musteri AB",
        "productionYear": null,
        "alcoholStrength": 0,
        "organic": true,
        "glutenFree": true,
        "lactoseFree": true,
        "kosher": false,
        "red": false,
        "white": false,
        "lastDelivery": new Date(2020, 1, 21)
    }
];