/**
 * This is the class for the group order (more than 1 person)
 * @file GroupOrder.js
 * @author Alessandra
 */
class GroupOrderClass {
    constructor() {
        this.groupOfOrdersArray = [];
    }

    add(order) {
        this.groupOfOrdersArray.push(order);
    }

    _getNumberOfOrders() {
        return this.groupOfOrdersArray.length;
    }
}

export default GroupOrderClass;