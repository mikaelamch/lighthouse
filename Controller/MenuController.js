/**
 * This is the controller that interacts with the model and the view of the menu
 * @file MenuController.js
 * @author Alessandra
 */

import MenuItemModel from '../Model/MenuItemModel.js';
import MenuDynamicView from '../View/MenuDynamicView.js';

// Array of menu items (instances of MenuItemModel) from the DB
const arrMenuItems = [];

$(() => {
    // Populate an array of objects from the JSON database "../Scripts/DB_Beverages.js"
    $.getJSON("../JSON/DB_Beverages.json", DB => {
        // Create an instance of the MenuDynamicView class, this view will be what is shown on the screen in the menu page
        let view = new MenuDynamicView();
       
        // It will get populated when cycling through the array
        for (let i in DB) {
            // Create an instance of the MenuItemModel
            let m = new MenuItemModel(DB[i].id, DB[i].name, DB[i].category, DB[i].beverageType, DB[i].volumeMl, DB[i].alcoholStrength, DB[i].organic, DB[i].glutenFree, DB[i].lactoseFree, DB[i].kosher, DB[i].red, DB[i].white, DB[i].priceWithVat);
            // Push the instance in the arrMenuItems
            arrMenuItems.push(m);
        }

        // PSEUDO CODE: for each element in the DB (now in the arrMenuItems)
        // Create a card in the html (all the informations will be displayed or used ad Ids in the tags)
        // The mechanics of this are not important here, it's the View's job - The controller just passes the data to show
        arrMenuItems.forEach(m => {
            let c = view.createItemCard(m._getId(), m._getName(), m._getCategory(), m._getBeverageType(), m._getVolumeMl(), m._getAlcoholStrength(), m._getAllergies(), m._getKosher(), m._getWineColor(), m._getPriceWithVat());
            view.append(c);
        });

        
        // DRAG-AND-DROP
        $(".menu-card").draggable({
            revert: "invalid",
            helper: "clone",
            start: function(event, ui) {
                $(ui.helper).css('width', "100%");
            }
        });
        // When dropping the card, a new div 
        $("#dropDiv").droppable({
            drop: function (event, ui) {
                // PSEUDO CODE: create an instance of the OrderModel
                // Add to the instance the menu item
                // Send the instance of the OrderModel to the view (of the Order)
                // In the view THINGS will get appended based on the data that was exchanged
                let name = ui.draggable.find('.menu-card-title').text();
                $("<div></div>") /** @todo order view */
                    .html(name)
                    .appendTo($(this));
            }
        });


        // PSEUDO CODE: handlers for the three buttons
        // Prev Next and Finish
        
    });


});


function getNameFromId(id) {
    return arrMenuItems.find(x => x._getId() === id)._getName();
}