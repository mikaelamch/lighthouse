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

    parseOrderToJSON() {
        let JSON = {
            table: 2,
            orders : []
        };

        // Each order will be associated to a person (represented by a numerical index in the array of orders (from 0 to n))
        this.groupOfOrdersArray.forEach((o) => {
            JSON.orders.push(o._getArray());
        });

        return JSON;
    }

    _getNumberOfOrders() {
        return this.groupOfOrdersArray.length;
    }
}

export default GroupOrderClass;