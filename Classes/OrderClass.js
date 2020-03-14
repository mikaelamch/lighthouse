/**
 * This is the class for the single order (1 person)
 */
import MenuItemClass from "/Classes/MenuItemClass.js";

class OrderClass {
    constructor() {
        this.orderArray = [];
    }

    /**
     * This method adds an orderItem object to the array that represents the order for one person.
     * @param {MenuItemClass} menuItem this is the instance of the MenuItemClass that will serve as a provider for the attributes in the orderItemObj
     */
    _add(menuItem) {
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
    _update(id) {
        let objIndex = this.orderArray.findIndex(x => x.id === id);
        let object =  this.orderArray[objIndex];
        // Update qty
        object.qty++;
        // Update totalPrice
        object.totalPrice = object.price * object.qty;
    }

    /**
     * Finds an object in the order array based on the id.
     * @param {Number} id of the menu item that I added to the order list
     * @returns {Boolean} true - if object is found, false - if object is not found
     */
    _find(id) {
        return this.orderArray.find(x => x.id === id) ? true : false;
    }

    _getArray() {
        return this.orderArray;
    }
}

export default OrderClass;