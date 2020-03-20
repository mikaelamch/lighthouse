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
import LocalStorageManagerClass from '../Classes/LocalStorageManagerClass.js';


// Array of menu items (instances of MenuItemClass) from the DB
const arrMenuItems = [];
// Create an istance of the class that is meant to access the database
const db = new DatabaseCRUDClass();
// Create an instance of the MenuDynamicView class, this view will be what is shown on the screen in the menu page
const view = new MenuDynamicView();
const viewO = new OrderDynamicView();
const undoRedo = new UndoRedoManagerClass();
const LSM = new LocalStorageManagerClass();
let groupOrder = new GroupOrderClass();
let order = new OrderClass();

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

    // PSEUDO CODE: for each element in the DB, if not desabled (now in the arrMenuItems)
    // Create a card in the html (all the informations will be displayed or used as "id" in the tags)
    // The mechanics of this are not important here, it's the View's job - The controller just passes the data to show
    // Get the array with the disabled items' ids
    let disabledItems = LSM.retrieveFromLocal(LSM.disabledItems);
    arrMenuItems.forEach(m => {
        if(disabledItems != null && !disabledItems.includes(m._getId())) {
            let c = view.createItemCard(m);
            view.append(c);
        } else if (disabledItems == null) {
            let c = view.createItemCard(m);
            view.append(c);
        }
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
    makeViewDroppable();

    // PSEUDO CODE: handlers for the buttons
    // $('#place-order-btn').click(() =>{
    //     $('#orderRecapModal').hide();
    //     $('.overlay').hide();
    // });

    $('.modal-close-btn').click(() => {
        $('#orderRecapModal').hide();
        $('.overlay').hide();
    });

    $('.undo').click(() => {
        if (undoRedo._getDoneOpArray().length > 0) {
            undoRedo.undo();
            order.updateUndoFromOperation(undoRedo._getLastOpInUndo());
            viewO._refreshView(`#${viewO._getActiveOrderId()}`, order);
        }
    });


    $('.redo').click(() => {
        if (undoRedo._getUndoneOpArray().length > 0) {
            undoRedo.redo();
            order.updateRedoFromOperation(undoRedo._getLastOpInDone());
            viewO._refreshView(`#${viewO._getActiveOrderId()}`, order);
        }
    });

    $('.add-person').click(() => {
        // PSEUDOCODE: When adding a new person 
        // -> The previous instance gets added to the group order
        if(order._getArray().length > 0) {
            groupOrder.add(order);
            // -> A new instance of the order gets created
            order = new OrderClass();
            //-> The current orther gets hidden (VIEW) 
            let activeView = viewO._getActiveOrderId();
            viewO._setViewToUnactive(activeView);
            
            //-> The new one gets created and shown (VIEW)
            viewO._createNewOrderSection(groupOrder._getNumberOfOrders());
            makeViewDroppable(order);
        }
    });

    $('.finish-btn').click(() => {
        if(order._getArray().length > 0) {
            groupOrder.add(order);
        }
        if (groupOrder._getNumberOfOrders() > 0) {
            $('#orderRecapModal').show();
            $('.overlay').show();
            LSM.saveToLocal(LSM.savedOrders, groupOrder.parseOrderToJSON());
            console.log(LSM.retrieveFromLocal(LSM.savedOrders));
            writeToOrdersMatrix(LSM.retrieveFromLocal(LSM.savedOrders)); //change ordersMatrix in local storage based on order
        } else if (order._getArray() > 0){
            $('#orderRecapModal').show();
            $('.overlay').show();
            LSM.saveToLocal(LSM.savedOrders, order.parseOrderToJSON());
            console.log(LSM.retrieveFromLocal(LSM.savedOrders));
            writeToOrdersMatrix(LSM.retrieveFromLocal(LSM.savedOrders)); //change ordersMatrix in local storage based on order
        }        
        
    });

    // When the user clicks anywhere outside of the modal, the modal closes
    $('.overlay').click(() => {
        $('#orderRecapModal').hide();
        $('.overlay').hide();
    });
});

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