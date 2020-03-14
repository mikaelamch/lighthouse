class OrderClass {
    constructor() {
        this.orderArray = [];
    }

    _add(menuItem) {
        this.orderArray.push(menuItem);
    }

    _getArray() {
        return this.orderArray;
    }
}

export default OrderClass;