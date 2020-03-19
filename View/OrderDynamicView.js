import MenuItemClass from "../Classes/MenuItemClass.js";

class OrderDynamicView {
    constructor() {
        this.orderRoot = '#order';
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

    _setViewToUnactive(id) {
        $(`#${id}`).removeClass('active');
        $(`#${id}`).addClass('unactive');
    }

    _createNewOrderSection(id) {
        const orderSection = `<div id="person${id+1}" class="single-order active">
                <div class="order-title">Person ${id+1}</div>
                <div class="listOfOrders">
                
                </div>
            </div>`;
        
        $(orderSection).appendTo($(this.orderRoot));
    }

    _showNameActiveView(id) {
        $('.order-title').html(`Person ${id}`);
    }
}

export default OrderDynamicView;