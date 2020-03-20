/**
 * This file contains the View class for the order. It deals with the way the list of items in the orders is displayed
 * @file OrderDynamicView.js
 * @author Alessandra
 */
import MenuItemClass from "../Classes/MenuItemClass.js";

class OrderDynamicView {
    constructor() {
        this.orderRoot = '#order';
    }

    /**
     * This method gets the active order (the person whose order is being taken at the moment)
     * @returns {HTMLElement} the html element with the active order
     */
    _getActiveOrderId() {
        return $('.active').attr('id');
    }

    /**
     * This method refresh the order view every time a new item is being added
     * @param {String} view the active order's id
     * @param {Array.<MenuItemClass>} order the model of the order
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

    // Set view to unactive - by adding the class unactive/removing the class active
    _setViewToUnactive(id) {
        $(`#${id}`).removeClass('active');
        $(`#${id}`).addClass('unactive');
    }

    /**
     * This method creates a new order section for a new person
     * @param {String} id new id for the new person's order section 
     */
    _createNewOrderSection(id) {
        const orderSection = `<div id="person${id+1}" class="single-order active">
                <div class="order-title">Person ${id+1}</div>
                <div class="listOfOrders">
                
                </div>
            </div>`;
        
        $(orderSection).appendTo($(this.orderRoot));
    }

    // Set the title of the order section
    _showNameActiveView(id) {
        $('.order-title').html(`Person ${id}`);
    }
}

export default OrderDynamicView;