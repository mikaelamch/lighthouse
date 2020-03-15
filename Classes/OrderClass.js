/**
 * This is the class for the single order (1 person)
 * @file OrderClass.js
 * @author Alessandra
 */
import MenuItemClass from "../Classes/MenuItemClass.js";

class OrderClass {
    constructor() {
        this.orderArray = [];
    }

    /**
     * This method adds an orderItem object to the array that represents the order for one person.
     * @param {MenuItemClass} menuItem this is the instance of the MenuItemClass that will serve as a provider for the attributes in the orderItemObj
     */
    add(menuItem) {
        let orderItemObj = {
            id: menuItem._getId(),
            name: menuItem._getName(),
            price: menuItem._getPriceWithVat(),
            qty: 1,
            totalPrice: menuItem._getPriceWithVat()
        };

        this.orderArray.push(orderItemObj);
    }

    /**
     * This method updated the quantity (increments it by 1) of an orderItem object in the array that represents the order for one person. It also updates the total price (qty * price).
     * @param {Number} id this is the id of the orderItem object that needs to be updated
     */
    update(id) {
        let objIndex = this.orderArray.findIndex(x => x.id === id);
        let object = this.orderArray[objIndex];
        // Update qty
        object.qty++;
        // Update totalPrice
        object.totalPrice = object.price * object.qty;
    }

    /**
     * This method updated the quantity (decreases it by 1) of an orderItem object in the array that represents the order for one person. It also updates the total price (qty * price).
     * @param {Number} id this is the id of the orderItem object that needs to be deleted
     */
    deleteSingleItem(id) {
        let objIndex = this.orderArray.findIndex(x => x.id === id);
        let object = this.orderArray[objIndex];
        // Update qty
        if (object.qty > 1) {
            object.qty--;
            // Update totalPrice
            object.totalPrice = object.price * object.qty;
        } else {
            // Delete element from array altogether
            this.orderArray = this.orderArray.filter(x => x.id != id);

        }
    }

    /**
     * Finds an object in the order array based on the id.
     * @param {Number} id of the menu item that I added to the order list
     * @returns {Boolean} true - if object is found, false - if object is not found
     */
    find(id) {
        return this.orderArray.find(x => x.id === id) ? true : false;
    }

    updateUndoFromOperation(operation) {
        this.deleteSingleItem(operation.item.id);

    }
    
    updateRedoFromOperation(operation) {
        console.log(operation);
        if(this.orderArray.find(x => x.id == operation.item.id)) {
            // If the item in the order exists then the redo is an update (increment qty by 1 and calculate the new total price)
            this.update(operation.item.id);
        } else {
            // Add the item
            this.orderArray.push(operation.item);
        }
    }

    _getSingleItem(id) {
        return this.orderArray.find(x => x.id === id);
    }

    _getArray() {
        return this.orderArray;
    }
}

export default OrderClass;