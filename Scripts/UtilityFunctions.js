/*This file contains some functions that are used repeatedly and accessed from multiple sources*/

/*set and get functions from local browser storage*/
function localStorageSetObj(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}
function localStorageGetObj(key) {
    return JSON.parse(localStorage.getItem(key));
}
//add new order into ordersMatrix
function writeToOrdersMatrix(savedOrders) {
    let ordersMatrix =  localStorageGetObj('ordersMatrix');
    for (let j = 0; j < 6; j++) {            //if an order has been paid & cleared OR if the order was never placed
        if (isEqual(ordersMatrix[savedOrders.table - 1][j], [1, 1, 1]) || isEqual(ordersMatrix[savedOrders.table - 1][j], [0, 0, 0])) {
            ordersMatrix[savedOrders.table - 1][j] = [1, 0, 0]; //save state in the ordersMatrix (order placed, not delivered, not paid)
            localStorageSetObj('ordersMatrix', ordersMatrix);
            break;
        }
    }
}

//Enable ths code when multiple tables orders are implemented from customer view
/*
function writeToOrdersMatrix(savedOrders) {
    let ordersMatrix =  localStorageGetObj('ordersMatrix');
    savedOrders.forEach(function(savedOrder){
        for (let j = 0; j < savedOrder.orders.length; j++) {            //if an order has been paid & cleared OR if the order was never placed
            if (isEqual(ordersMatrix[savedOrder.table - 1][j], [1, 1, 1]) || isEqual(ordersMatrix[savedOrder.table - 1][j], [0, 0, 0])) {
                ordersMatrix[savedOrder.table - 1][j] = [1, 0, 0]; //save state in the ordersMatrix (order placed, not delivered, not paid)
                localStorageSetObj('ordersMatrix', ordersMatrix);
               // break;
            }
        }
    });
}*/


//utility method to compare 2 arrays, can be moved out of file if required
function isEqual(array1,array2)
{        // comparing each element of array
    for(let i=0;i<array1.length;i++) {
        if (array1[i] != array2[i]) {
            return false;
        }
    }
    return true;
}

(function initializeOrdersMatrix() {
    if(!localStorage.getItem('ordersMatrix')) {//app being launched for the first time
        var ordersMatrix = [];
        let rows = 6;
        let columns = 6;
        for (let i = 0; i < rows; i++) {
            ordersMatrix.push([0]);
            for (var j = 0; j < columns; j++) {
                ordersMatrix[i][j] = [0, 0, 0];
            }
        }
        localStorageSetObj('ordersMatrix', ordersMatrix);
    }
}());






