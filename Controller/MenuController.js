/**
 * This is the controller that interacts with the model and the view of the menu (you can see from the imports)
 * @file MenuController.js
 * @author Alessandra
 * @author Nikolay
 */
import DatabaseCRUDClass from '../Classes/DatabaseCRUDClass.js';
import MenuItemClass from '../Classes/MenuItemClass.js';
import OrderClass from '../Classes/OrderClass.js';
import MenuDynamicView from '../View/MenuDynamicView.js';
import OrderDynamicView from '../View/OrderDynamicView.js';
import GroupOrderClass from '../Classes/GroupOrderClass.js';
import UndoRedoManagerClass from '../Classes/UndoRedoManagerClass.js';
import LocalStorageManagerClass from '../Classes/LocalStorageManagerClass.js';

// Array of menu items (instances of MenuItemClass) from the DB
const arrMenuItems = [];
// Create an istance of the class that is meant to access the database
const db = new DatabaseCRUDClass();
// Create an instance of the MenuDynamicView class, this view will be what is shown on the screen in the menu page
const view = new MenuDynamicView();
// Create an instance of the OrderDynamicView class, this view will be what is shown in the order section
const viewO = new OrderDynamicView();
// Create an instance of the UndoRedoManagerClass, which will allow to undo/redo the drag and drops (i.e. adding items to the order)
const undoRedo = new UndoRedoManagerClass();
// Create an instance of the LocalStorageManagerClass, which will allow to save either the single order or the group order to the local storage so that the Bartender can access it
const LSM = new LocalStorageManagerClass();
// Create a global instance of the GroupOrderClass, which will contain the orders from each person (when there is more than 1 person)
let groupOrder = new GroupOrderClass();
// Create a global instance of the OrderClass, which will contain the orders from 1 person (when there is only 1 person)
// This variable gets reset to a new instance every time a new person is added
let order = new OrderClass();

$(() => {
    // Get the json from the instance of the class DatabaseCRUDClass that accesses the database
    let DB = db._getDbJSON();
    // The array with the menu items will get populated when cycling through DB
    for (let i in DB) {
        // Create an instance of the MenuItemClass
        let m = new MenuItemClass(db._getSingleProduct(i));
        // Push the instance in the arrMenuItems
        arrMenuItems.push(m);
    }
   
    // Get the array with the disabled items' ids
    let disabledItems = LSM.retrieveFromLocal(LSM.disabledItems);
    // PSEUDO CODE:
    // -> For each element in the arrMenuItems, if not disabled
    // -> Create a card in the html (all the informations provided to the View will be displayed or used as "id" in the tags)
    //    The mechanics of this are not important here, it's the View's job - The controller just passes the data to show
    arrMenuItems.forEach(m => {
        // I check that the id of the object in the arrMenuItems is not in the disabledItems' one
        if(disabledItems != null && !disabledItems.includes(m._getId())) {
            let c = view.createItemCard(m);
            view.append(c);
        } else if (disabledItems == null) {
            let c = view.createItemCard(m);
            view.append(c);
        }
        // Do nothing (aka don't show a card) if the id of the object in this cycle is in the disabledItems'one 
    });

    // DRAG-AND-DROP
    $(".menu-card").draggable({
        revert: "invalid",
        helper: "clone",
        start: function (event, ui) {
            // This might look like something that concerns the view, but it's just a way to keep the size of the draggable items fixed
            $(ui.helper).css('width', "100%");
        }
    });

    // See function below
    // Makes the order view droppable
    makeViewDroppable();

    // BUTTONS CLICK EVENT HANDLERS
    // Close the pop-up window with the confirmation of the order
    $('.modal-close-btn').click(() => {
        view.hidePopUpModal();
        // Refresh page
        history.go(0);
    });

    $('.undo-btn').click(() => {
        if (undoRedo._getDoneOpArray().length > 0) {
            undoRedo.undo();
            order.updateUndoFromOperation(undoRedo._getLastOpInUndo());
            viewO._refreshView(`#${viewO._getActiveOrderId()}`, order);
        }
    });

    $('.redo-btn').click(() => {
        if (undoRedo._getUndoneOpArray().length > 0) {
            undoRedo.redo();
            order.updateRedoFromOperation(undoRedo._getLastOpInDone());
            viewO._refreshView(`#${viewO._getActiveOrderId()}`, order);
        }
    });

    $('.add-person-btn').click(() => {
        // PSEUDOCODE: When adding a new person 
        // -> The previous instance gets added to the group order
        if(order._getArray().length > 0 && groupOrder._getNumberOfOrders() < 5) {
            groupOrder.add(order);
            // -> A new instance of the order gets created
            order = new OrderClass();
            //-> The current orther gets hidden (VIEW) 
            let activeView = viewO._getActiveOrderId();
            viewO._setViewToUnactive(activeView);
            
            //-> The new one gets created and shown (VIEW)
            viewO._createNewOrderSection(groupOrder._getNumberOfOrders());
            makeViewDroppable();
        }
    });

    $('.finish-btn').click(() => {
        // If there is at least one item in the visible order, it will be added to the order when it's saved to the local storage
        if(order._getArray().length > 0) {
            groupOrder.add(order);
        }
        if (groupOrder._getNumberOfOrders() > 0) {
            view.showPopUpModal();
            LSM.saveToLocal(LSM.savedOrders, groupOrder.parseOrderToJSON());
            writeToOrdersMatrix(LSM.retrieveFromLocal(LSM.savedOrders)); //change ordersMatrix - for the Bartender - in local storage based on order
        } else if (order._getArray() > 0){
            view.showPopUpModal();
            LSM.saveToLocal(LSM.savedOrders, order.parseOrderToJSON());
            writeToOrdersMatrix(LSM.retrieveFromLocal(LSM.savedOrders)); //change ordersMatrix - for the Bartender - in local storage based on order
        }
        // No order is saved to the local storage 
    });

    // When the user clicks anywhere outside of the modal, the modal closes
    $('.overlay').click(() => {
        view.hidePopUpModal();
        // Refresh page
        history.go(0);
    });
});

/**
 * This function makes the order section droppable and handles the drop event
 */
function makeViewDroppable() {
     // When dropping the card, the menu item related to the card will be added to the array in 'order'
     $(`#${viewO._getActiveOrderId()}`).droppable({
        drop: function (event, ui) {
            let idItem = parseInt(ui.draggable.attr('id'));
            if (order.find(idItem)) {
                order.update(idItem);
                // PUT IN THE DONE OPERATIONS
                let item = order._getSingleItem(idItem);
                undoRedo.do({ type: 'u', item: item });
            } else {
                order.add(new MenuItemClass(db._getSingleProduct(idItem)));
                // PUT IN THE DONE OPERATIONS
                let item = order._getSingleItem(idItem);
                undoRedo.do({ type: 'a', item: item });
            }
            // Send the instance of the OrderModel to the view (of the Order)
            // In the view THINGS will get appended based on the data that was exchanged
            viewO._refreshView(`#${viewO._getActiveOrderId()}`, order);
        }
    });
}