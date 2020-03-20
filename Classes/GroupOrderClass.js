/**
 * This is the class for the group order (more than 1 person)
 * @file GroupOrderClass.js
 * @author Alessandra
 */
class GroupOrderClass {
    constructor() {
        this.groupOfOrdersArray = [];
    }

    /**
     * This method adds an OrderClass instance to the array groupOfOrdersArray
     * @param {OrderClass} order the instance of OrderClass to be added to the groupOfOrdersArray
     */
    add(order) {
        this.groupOfOrdersArray.push(order);
    }

    /**
     * This method returns a JSON with the parsed group order with the structure specified in the method itself
     * @returns {JSON} 
     */
    parseOrderToJSON() {
        let JSON = {
            table: 2,
            orders : []
        };

        // Each order will be associated to a person (represented by a numerical index in the array of JSON.orders (from 0 to 5))
        this.groupOfOrdersArray.forEach((o) => {
            JSON.orders.push(o._getArray());
        });

        return JSON;
    }

    /**
     * This getter method allows to get the number of orders per table that have been placed
     * @returns {Number} the number of orders
     */
    _getNumberOfOrders() {
        return this.groupOfOrdersArray.length;
    }
}

export default GroupOrderClass;