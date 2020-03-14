class OrderDynamicView {
    constructor() {
        
    }

    _getActiveOrderId() {
        return $('.active').attr('id');
    }

    _refreshView(view, order) {
        /** @todo KEEP THE BUTTONS IN THE VIEW */
        $(view).html('');
        order._getArray().forEach(o => {
            $("<div></div>")
                .html(o._getName())
                .appendTo($(view));
        });
    }

    /** @todo ADD CREATE ITEMINORDER WITH BASIC INFO - NAME AND PRICE */
}

export default OrderDynamicView;