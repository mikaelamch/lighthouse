/**
 * @file MenuController - this is the controller that interacts with the model and the view of the menu
 */
$(()=>{
    // Populate an array of objects from the JSON database "../Scripts/DB_Beverages.js"
    $.getJSON("../JSON/DB_Beverages.json", function(DB) {
        
        // Create an instance of the MenuDynamicView class, this view will be what is shown on the screen in the menu page
        let view = new MenuDynamicView();
        // Array of menu items from the DB
        let arrMenuItems = [];
        for(let i in DB) {
            let m = new MenuItem(DB[i].id, DB[i].name, DB[i].category, DB[i].beverageType, DB[i].volumeMl, DB[i].alcoholStrength, DB[i].organic, DB[i].glutenFree, DB[i].lactoseFree, DB[i].kosher, DB[i].red, DB[i].white, DB[i].priceWithVat);

            arrMenuItems.push(m);
        }

        // PSEUDO CODE: for each element in the DB (arrMenuItems)
        // Create a box with basic information and show it as a grid in the menu page
        arrMenuItems.forEach(m => {
            view.createItemCard(m.name, m.category, m.beverageType, m.volumeMl, m.alcoholStrength, m.organic, m.glutenFree, m.lactoseFree, m.kosher, m.red, m.white, m.priceWithVat); //Will get an html string out of this
        });
        
    });
});
