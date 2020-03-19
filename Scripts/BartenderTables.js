/*All data models are defined in BartenderViewModel.js which can be modified for any changes required in View.*/

/*ordersMatrix is initialized in the method initializeOrdersMatrix in UtilityFunctions.js*/
var ordersMatrix = localStorageGetObj('ordersMatrix'); //get ordersMatrix from local storage if it exists already

/*Orders 1-6 to be added to view when order is placed*/
var ordersArray= [
    dataViewModels.ordersArray_1,
    dataViewModels.ordersArray_2,
    dataViewModels.ordersArray_3,
    dataViewModels.ordersArray_4,
    dataViewModels.ordersArray_5,
    dataViewModels.ordersArray_6
];

if(localStorage.getItem('savedOrders')){
    var placedOrders = localStorageGetObj('savedOrders');  //get placed order saved in local storage
}

function viewOrderItems(element, orderNumber){

    /*remove previous list added*/
    let tabContents = document.getElementById("Table_Inner_Container");
    if(tabContents.lastChild.id !== 'Tables_container_top')
    tabContents.removeChild(tabContents.lastChild);

    let tableName = element.parentElement.id; //Get Table name
    /*creating dynamic ids for the checkboxes*/
    let deliveredCBId = 'del-'+tableName+'-'+ orderNumber;
    let paidCBId = 'paid-'+tableName+'-'+ orderNumber;

    /*check for delivery status before displaying*/
    let tableNum = tableName.split("_")[1];
    let deliveredStatusNum = localStorageGetObj('ordersMatrix')[tableNum-1][orderNumber-1][1]; //get the delivery status of the viewed order from ordersMatrix
    let deliveredStatus = '';
    if(deliveredStatusNum)
        deliveredStatus = 'checked'; //restore the delivered status when viewing previous orders that has been delivered
    let disablepaidBox = !deliveredStatusNum ?'disabled="disabled"':''; //paid box should be disabled only if delivered box is not checked

    /*Get ordered items from localStorage*/
    if(placedOrders && placedOrders.orders.length && placedOrders.orders.length > 0) {
        var orderedItemsArray = placedOrders.orders[orderNumber - 1];
    }

    //Enable ths code when multiple tables orders are implemented from customer view
    /*var orderedItemsArray =[];
    if(placedOrders && placedOrders.length > 0){
        placedOrders.forEach(function(placedOrder){
            if(placedOrder.table === Number(tableNum)){
                 orderedItemsArray = placedOrder.orders[orderNumber - 1];
            }
        });
    }*/

    let ordersListMenuItems = ''; //items from the menu to be appended to this string
    let totalPrice = 0; //total price of items ordered
    if(orderedItemsArray) {
        orderedItemsArray.forEach(function (item) {
            ordersListMenuItems = ordersListMenuItems + dataViewModels.ordersListMenuItems_1a + item.name + dataViewModels.ordersListMenuItems_1b+ item.qty + dataViewModels.ordersListMenuItems_1c; //item name appended with qty
            totalPrice += item.totalPrice; //cumulative total price of all items
        });
    }

    /*Add a list with order items on screen*/
    let ordersList = dataViewModels.ordersList_1+
        dataViewModels.ordersList_2 + tableNum + dataViewModels.doubledivend +
        dataViewModels.ordersList_3 + orderNumber+ dataViewModels.doubledivend +
         ordersListMenuItems +
        dataViewModels.ordersList_4a + totalPrice.toFixed(2) + dataViewModels.ordersList_4b +
        dataViewModels.ordersList_5a + deliveredCBId + dataViewModels.ordersList_5b + deliveredStatus + dataViewModels.ordersList_5c +
        dataViewModels.ordersList_6a + paidCBId + dataViewModels.ordersList_6b + disablepaidBox + dataViewModels.ordersList_6c;
    tabContents.insertAdjacentHTML('beforeend', ordersList);
    populateText('.orders_list'); //call translation function for elements newly added to the view
}

function handlePaidClick(cb) {
    if(cb.checked){ //if paid checkbox has been checked
        let cbParents = cb.id.split("-");
        let tableName = cbParents[1];
        let orderNum = cbParents[2];
        let table = document.getElementById(tableName); //get parent element with table name id
        let childOrder = document.querySelectorAll('#'+tableName+' .order_'+orderNum)[0];  //find its child with the order number and remove.
        table.removeChild(childOrder); //remove div

        let tableNum = table.id.split("_")[1];
        /*save state of being delivered & paid*/
        ordersMatrix[tableNum-1][orderNum-1]=[1,1,1];
        localStorageSetObj('ordersMatrix',ordersMatrix);

        /*close items view when paid option is checked*/
        let tabContents = document.getElementById("Table_Inner_Container");
        tabContents.removeChild(tabContents.lastChild);
    }
}

function handleDeliveredClick(cb) { //called when delivered checkbox is clicked
    let cbParents = cb.id.split("-"); //get the checkbox parent table and order number from its id
    let tableNum = cbParents[1].split("_")[1];
    let orderNum = cbParents[2];
    /*save state of order if order is delivered but not paid for*/
    ordersMatrix[tableNum-1][orderNum-1]=[1,1,0];
    localStorageSetObj('ordersMatrix',ordersMatrix);

    /*construct paidbox id from deliveredbox id & enable paid checkbox*/
    let paidCBId = 'paid-'+cbParents[1]+'-'+ orderNum;
    document.getElementById(paidCBId).disabled = false;
}



$(function() { //executes only after the final page with all components are loaded

    //Author:Juhee
    //Add click events to tabs
    var tableTab = document.getElementById("bartender_table_view_txt");
    var stockTab = document.getElementById("bartender_stock_view_txt");
    var houseTab = document.getElementById("bartender_house_view_txt");
    tableTab.addEventListener("click", openPage.bind(this,'Table', tableTab, '#462a17'));
    stockTab.addEventListener("click", openPage.bind(this,'Stock', stockTab, '#462a17'));
    houseTab.addEventListener("click", openPage.bind(this,'House', houseTab, '#462a17'));
    tableTab.click(); //loads the table view by default

    function openPage(pageName, elmnt, color) {
        // Hide all elements with class="tabcontent" by default */
        let tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        // Remove the background color of all tablinks/buttons
        tablinks = document.getElementsByClassName("tablink");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].style.backgroundColor = "";
        }
        // Show the specific tab content
        document.getElementById(pageName).style.display = "block";
        // Add the specific color to the button used to open the tab content
        elmnt.style.backgroundColor = color;
    }

    //time bar at the bottom
    var currentTime = new Date(),
        year = currentTime.getFullYear(),
        day = currentTime.getDate();


    if (day < 10)  {
        day = "0" + day;
    }
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const dayNames = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    //document.getElementById('time').innerHTML = hours + ":" + minutes;
    document.getElementById('today').innerHTML = year + " " + monthNames[currentTime.getMonth()] +  " " + day +  " " + dayNames[currentTime.getDay()];

    //Author:Anagha
    if(placedOrders) { // if there are any orders placed
        let tableNum = placedOrders.table;
        let tableName = 'Table_' + placedOrders.table;
        let orders = placedOrders.orders;
        orders.forEach(function () {
            displayOrderOnLoad(tableName, tableNum - 1);
        });
    }

    //Enable ths code when multiple tables orders are implemented from customer view
  /*  if(placedOrders) { // if there are any orders placed
        placedOrders.forEach(function(placedOrder){
            let tableNum = placedOrder.table;
            let tableName = 'Table_' + placedOrder.table;
            let numOfOrders = placedOrder.orders.length;
            let orders = placedOrder.orders;
            displayOrderOnLoad(tableName, tableNum - 1);
        });
    }*/

    function displayOrderOnLoad(tableName, tableNumber) { //to reload all the current orders from local storage when app is refreshed
        for (let j = 0; j < 6; j++) {
            //paid or unplaced orders need not be displayed
            if (!isEqual(localStorageGetObj('ordersMatrix')[tableNumber][j], [1, 1, 1]) && !isEqual(localStorageGetObj('ordersMatrix')[tableNumber][j], [0, 0, 0])) {
                let order = ordersArray[j]; //insert order from the ordersArray
                let table = document.getElementById(tableName);
                table.insertAdjacentHTML('beforeend', order);
                localStorageSetObj('ordersMatrix',ordersMatrix);
            }
        }
    }

});