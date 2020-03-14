import MenuItemClass from "../Classes/MenuItemClass.js";

class OrderDynamicView {
    constructor() {
        
    }

    _getActiveOrderId() {
        return $('.active').attr('id');
    }

    /**
     * 
     * @param {String} view 
     * @param {Array.<MenuItemClass>} order 
     */
    _refreshView(view, order) {
        $(`${view} .listOfOrders`).html('');
        order._getArray().forEach(o => {
            $(this._createOrderItemView(o))
                .appendTo($(`${view} .listOfOrders`));
        });
    }

    _createOrderItemView(singleOrder) {
        let singleOrderTemplate = `<div><span class="nameOrderItem">${singleOrder.name}</span><span class="qtyOrderItem">x ${singleOrder.qty}</span><span class="totalPriceOrderItem">${singleOrder.totalPrice}:-</span></div>`
        
        return singleOrderTemplate;
    }

    /** @todo ADD CREATE ITEMINORDER WITH BASIC INFO - NAME AND PRICE */
}

export default OrderDynamicView;