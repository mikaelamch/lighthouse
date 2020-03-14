class GroupOrder {
    constructor() {
        this.groupOfOrdersArray = [];
    }

    _add(order) {
        this.groupOfOrdersArray.push(order);
    }
}

export default GroupOrder;