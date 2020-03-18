/*All data models are defined in BartenderViewModel.js which can be modified for any changes required in View.*/

/*Import UndoRedoManagerClass to support undo-redo operation in bartender profile*/
import UndoRedoManagerClass from '../Classes/UndoRedoManagerClass.js';
const undoRedo = new UndoRedoManagerClass();

/*Function to re-render view for on the house items column in bartender view*/
function refreshHtml(items){
    $('#saved_item_names').html('');//clear div contents
    /*Add new list of contents to div*/
    items.forEach(item => {
        $(dataViewModels.refreshHtml_1)
            .html(item.itemName + dataViewModels.refreshHtml_2a + item.itemQty + dataViewModels.refreshHtml_2b)
            .appendTo($('#saved_item_names'));

    });
}

$(document).ready(function() {
    /* Read from DB_Beverages.json to populate data in the Stock tab for bartender view*/
    $.getJSON("JSON/DB_Beverages.json", function (items) {
        //structure to insert into view
        let stockSlNo = document.getElementById('stock_sl_no'); // Stock item serial number column
        let stockItemsColumn = document.getElementById('stock_item'); //Stock item name column
        let stockNumberColumn = document.getElementById('stock_number'); //Stock number column
        let stockDisableColumn = document.getElementById('stock_disable'); //column for item disable checkboxes
        let houseStockSlNo = document.getElementById('house_stock_sl_no'); //Column for Stock item serial num in the 'On the House' tab
        let houseStockItemsColumn = document.getElementById('house_stock_item');//Column for Stock item name in the 'On the House' tab

        Object.values(items).forEach(function (item) {
            /*Insert items read from json file into Stock tab view.*/
            stockSlNo.insertAdjacentHTML('beforeend',  dataViewModels.stock_1a + item.id + dataViewModels.stockSlNo_1b + item.id + dataViewModels.stockSlNo_1c);
            stockItemsColumn.insertAdjacentHTML('beforeend',  dataViewModels.stock_1a + item.id + dataViewModels.stockItemsColumn_1b + item.name + dataViewModels.stock_1c);
            stockNumberColumn.insertAdjacentHTML('beforeend', dataViewModels.stock_1a + item.id + dataViewModels.stockNumberColumn_1b + item.stockQuantity + dataViewModels.stock_1c);
            stockDisableColumn.insertAdjacentHTML('beforeend', dataViewModels.stockDisableColumn_1a + dataViewModels.stockDisableColumn_1b + item.id + dataViewModels.stockDisableColumn_1c);
            /*Insert items read from json file into 'On the house' tab view */
            houseStockSlNo.insertAdjacentHTML('beforeend', dataViewModels.houseStockSlNo + item.id + dataViewModels.stockSlNo_1c);
            houseStockItemsColumn.insertAdjacentHTML('beforeend', dataViewModels.houseStockItemsColumn + item.name + dataViewModels.stock_1c);
        });

        //reload on the house items that have been saved
        if (localStorage.getItem('onTheHouse')) {
            let savedItems = localStorageGetObj('onTheHouse') ? localStorageGetObj('onTheHouse') : [];
            savedItems.forEach(function (item) {
                let content = dataViewModels.savedItems_1a + item.itemName + dataViewModels.savedItems_1b + item.itemQty + dataViewModels.savedItems_1c;
                document.getElementById('saved_item_names').insertAdjacentHTML('beforeend', content);
            });
        }

        /* DRAG-AND-DROP (code re-used from menu view controller file)*/
        $(".flexbox4_items_column1").draggable({
            revert: "invalid",
            helper: "clone",
            start: function (event, ui) {
                $(ui.helper).css('font-size', "x-large");
            }
        });
        // When dropping the card, a new div is added
        $("#on_the_house_items").droppable({
            drop: function (event, ui) {
                let name = ui.draggable.find('.flexbox4_items_column1').prevObject["0"].innerText;
                let itemMatchFlag = false; //flag to check if there is match to an item already on the list
                //write to local storage the items given away on the house
                let items = localStorageGetObj('onTheHouse') ? localStorageGetObj('onTheHouse') : [];
                //check if the item already exists
                items.forEach(function (item, index) {
                    if (item.itemName == name) {
                        itemMatchFlag = true;
                        item.itemQty++; // increase item qty if it already exists on the list
                        items[index]['itemQty'] = item.itemQty; //update the itemQty for saving in local storage
                    }
                });
                /*If a new item is added*/
                if (!itemMatchFlag) {
                    items.push({'itemName': name, 'itemQty': 1});
                }
                undoRedo.do({'itemName': name, 'itemQty': 1});//save action in the UndoRedoManagerClass
                localStorageSetObj('onTheHouse', items); //save new list of items to local storage
                refreshHtml(items);//re-render items list in view
            }
        });

        //undo btn clicked
        $("#oth_undo").click(function () {
            //get last done operation and change items list
            let changedItem = undoRedo._getLastOpInDone(); //get the last operation that was done
            if (changedItem) {
                let removedIndex;
                undoRedo.undo(); //undo operation
                let savedItems = localStorageGetObj('onTheHouse');
                savedItems.forEach(function (savedItem, index) {
                    if (savedItem.itemName === changedItem.itemName) {
                        /*Get item index for removing from list if item qty is 1*/
                        if (savedItem.itemQty - 1 === 0) {
                            removedIndex = index;
                        } else
                            savedItems[index]['itemQty'] = savedItem.itemQty - 1; //decrease qty if qty more than 1
                    }
                });
                if (removedIndex !== undefined)
                    savedItems.splice(removedIndex, 1); //remove item from list
                refreshHtml(savedItems);//re-render items list
                localStorageSetObj('onTheHouse', savedItems); //save new list of items to local storage
            }
        });
        //redo btn clicked
        $("#oth_redo").click(function () {
            let changedItem = undoRedo._getLastOpInUndo();//get last undone operation and change items list
            if (changedItem) {
                let itemPresent = false;
                undoRedo.redo(); //redo operation
                let savedItems = localStorageGetObj('onTheHouse');
                savedItems.forEach(function (savedItem, index) {
                    if (savedItem.itemName === changedItem.itemName) {
                        savedItems[index]['itemQty'] = savedItem.itemQty + 1;
                        itemPresent = true;
                    }
                });
                if (!itemPresent)
                    savedItems.push({"itemName": changedItem.itemName, "itemQty": 1});
                refreshHtml(savedItems);//re-render items list
                localStorageSetObj('onTheHouse', savedItems); //save new list of items to local storage
            }
        });

    });
});