class GroupOrder {
    constructor() {
        this.groupOfOrdersArray = [];
    }

    add(order) {
        this.groupOfOrdersArray.push(order);
    }
}

export default GroupOrder;