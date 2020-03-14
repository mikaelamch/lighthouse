/**
 * This is the controller that interacts with the model and the view of the menu (you can see from the imports)
 * @file MenuController.js
 * @author Alessandra
 */
import DatabaseCRUDClass from '../Classes/DatabaseCRUDClass.js';
import MenuItemClass from '../Classes/MenuItemClass.js';
import OrderClass from '../Classes/OrderClass.js';
import MenuDynamicView from '../View/MenuDynamicView.js';
import OrderDynamicView from '../View/OrderDynamicView.js';
import GroupOrderClass from '../Classes/GroupOrderClass.js';
import UndoRedoManagerClass from '../Classes/UndoRedoManagerClass.js';


// Array of menu items (instances of MenuItemClass) from the DB
const arrMenuItems = [];
// Create an istance of the class that is meant to access the database
const db = new DatabaseCRUDClass();
// Create an instance of the MenuDynamicView class, this view will be what is shown on the screen in the menu page
const view = new MenuDynamicView();
const viewO = new OrderDynamicView();
const undoRedo = new UndoRedoManagerClass();

$(() => {
    // Get the json from the instance of the class that accesses the database
    let DB = db._getDbJSON();
    // It will get populated when cycling through the array
    for (let i in DB) {
        // Create an instance of the MenuItemClass
        let m = new MenuItemClass(db._getSingleProduct(i));
        // Push the instance in the arrMenuItems
        arrMenuItems.push(m);
    }

    // PSEUDO CODE: for each element in the DB (now in the arrMenuItems)
    // Create a card in the html (all the informations will be displayed or used as "id" in the tags)
    // The mechanics of this are not important here, it's the View's job - The controller just passes the data to show
    arrMenuItems.forEach(m => {
        let c = view.createItemCard(m);
        view.append(c);
    });

    let groupOrder = new GroupOrderClass();
    let order = new OrderClass();

    // DRAG-AND-DROP
    $(".menu-card").draggable({
        revert: "invalid",
        helper: "clone",
        start: function (event, ui) {
            // This might look like something that concerns the view, but it's just a way to keep the size of the draggable items fixed
            $(ui.helper).css('width', "100%");
        }
    });
    // When dropping the card, the menu item related to the card will be added to the array in 'order'
    $(`#${viewO._getActiveOrderId()}`).droppable({
        drop: function (event, ui) {
            let idItem = parseInt(ui.draggable.attr('id'));
            if (order._find(idItem)) {
                order._update(idItem);
                // PUT IN THE DONE OPERATIONS
                // undoRedo._do({type: 'u', obj: item});
            } else {
                let item = new MenuItemClass(db._getSingleProduct(idItem));
                order._add(item);
                // PUT IN THE DONE OPERATIONS
                // undoRedo._do({type: 'a', obj: item});
            }
            // Send the instance of the OrderModel to the view (of the Order)
            // In the view THINGS will get appended based on the data that was exchanged
            viewO._refreshView(`#${viewO._getActiveOrderId()}`, order);
        }
    });

    // PSEUDO CODE: handlers for the three buttons
    // Prev Next and Finish
    /** @todo ADD HANDLERS, IN THE HANDLER 'ADD PERSON' (OR NEXT) CALL THE VIEW METHOD 'UPDATATEORDERBLOCK', PASS THE CURRENT VIEW!!!!
     * @todo TEMPORARY UNDO REDO
    */
   $('.undo').click(() =>{
    //    undoRedo._undo();
    //    console.log(undoRedo.undoneOperations);
   });

});