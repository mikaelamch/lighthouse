//Author:Anagha
//initialize ordersMatrix for keeping track of state of orders
//ordersMatrix is a 2D matrix with its values assigned as arrays of length 3. For eg., ordersMatrix[x][y] = [1,1,0] where x gives us the table number and y gives us the order number
//the indices from 0 to 2 in arrays of length 3 represent 'order placed status', 'order delivered status' and 'order paid for status' respectively.
//For eg., ordersMatrix[2][5]=[1,1,0] indicates that Table 3 order 6 has been placed(1) and delivered(1) but hasn't been paid for(0).
if(!localStorage.getItem('ordersMatrix')) {//app being launched for the first time
    var ordersMatrix = [];
    var rows = 6;
    var columns = 6;
    for (var i = 0; i < rows; i++) {
        ordersMatrix.push([0]);
        for (var j = 0; j < columns; j++) {
            ordersMatrix[i][j] = [0, 0, 0];
        }
    }
    localStorageSetObj('ordersMatrix', ordersMatrix);
}
else
    ordersMatrix = localStorageGetObj('ordersMatrix'); //get ordersMatrix from local storage if it exists already

//set and get functions from local browser storage
function localStorageSetObj(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj))
}

function localStorageGetObj(key) {
    return JSON.parse(localStorage.getItem(key))
}

//hardcoded orders 1-8 to be added to view when order is placed
var ordersArray= ['<div class="table_orders order_1" onClick="viewOrderItems(this, 1)">1</div>',
    '<div class="table_orders order_2" onClick="viewOrderItems(this, 2)">2</div>',
    '<div class="table_orders order_3" onClick="viewOrderItems(this, 3)">3</div>',
    '<div class="table_orders order_4" onClick="viewOrderItems(this, 4)">4</div>',
    '<div class="table_orders order_5" onClick="viewOrderItems(this, 5)">5</div>',
    '<div class="table_orders order_6" onClick="viewOrderItems(this, 6)">6</div>'
];

function viewOrderItems(element, orderNumber){
    //remove previous list added
    var tabContents = document.getElementById("Table_Inner_Container");
    if(tabContents.lastChild.id !== 'Tables_container_top')
    tabContents.removeChild(tabContents.lastChild);
    //Get Table name
    var tableName = element.parentElement.id;
    //creatig dymanic ids for the checkboxes
    var deliveredCBId = 'del-'+tableName+'-'+ orderNumber;
    var paidCBId = 'paid-'+tableName+'-'+ orderNumber;

    //check for delivery status before displaying
    var tableNum = tableName.split("_")[1];
    var deliveredStatusNum = localStorageGetObj('ordersMatrix')[tableNum-1][orderNumber-1][1]; //get the delivery status of the viewed order from ordersMatrix
    var deliveredStatus = '';
    if(deliveredStatusNum)
        deliveredStatus = 'checked'; //restore the delivered status when viewing previous orders that has been delivered
    var disablepaidBox = !deliveredStatusNum ?'disabled="disabled"':''; //paid box should be disabled only if delivered box is not checked

    //Add a list with order items on screen
    var ordersList = '<div class="orders_list"><br><b>Table :</b>' +tableName+'<br><b>Order Number :</b>' + orderNumber+
        '<br><br>Pina colada' + //need to remove hardcoded data and populate with actual data
        '<br>Bloody Mary'+
        '<br>Cheese Fries (2)'+
        '<br>Samuel Adams Winter Lager<br><br>'+
        '<input type="checkbox" id='+deliveredCBId+' class="delivered_cb" name="delivered" value="delivered" onclick=\'handleDeliveredClick(this)\' '+deliveredStatus+'>: Delivered<br>'+
        '<input type="checkbox" id='+paidCBId+' class="paid_cb" name="paid" value="paid" onclick=\'handlePaidClick(this)\' '+ disablepaidBox +'>: Paid' +
        '</div>';
    tabContents.insertAdjacentHTML('beforeend', ordersList);
}

function handlePaidClick(cb) {
    if(cb.checked){ //if paid checkbox has been checked
        var cbParents = cb.id.split("-");
        var tableName = cbParents[1];
        var orderNum = cbParents[2];

        //get parent element with table name id
        var table = document.getElementById(tableName);
        //find its child with the order number and remove.
        var childOrder = document.querySelectorAll('#'+tableName+' .order_'+orderNum)[0];
        //remove
        table.removeChild(childOrder);
        var tableNum = table.id.split("_")[1];
        //save state of being delivered & paid
        ordersMatrix[tableNum-1][orderNum-1]=[1,1,1];
        localStorageSetObj('ordersMatrix',ordersMatrix);
        //close items view when paid option is checked
        var tabContents = document.getElementById("Table_Inner_Container");
        tabContents.removeChild(tabContents.lastChild);
    }
}

function handleDeliveredClick(cb) {
    var cbParents = cb.id.split("-"); //get the checkbox parent table and order number from its id
    var tableNum = cbParents[1].split("_")[1];
    var orderNum = cbParents[2];
    // because we need to save state of order if order is delivered but not paid for
    ordersMatrix[tableNum-1][orderNum-1]=[1,1,0];
    localStorageSetObj('ordersMatrix',ordersMatrix);
    //construct paidbox id from deliveredbox id & enable paid checkbox
    var paidCBId = 'paid-'+cbParents[1]+'-'+ orderNum;
    document.getElementById(paidCBId).disabled = false;
}

//utility method to compare 2 arrays, can be moved out of file if required
function isEqual(array1,array2)
{        // comparing each element of array
        for(var i=0;i<array1.length;i++) {
            if (array1[i] != array2[i]) {
                return false;
            }
        }
        return true;
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
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        // Remove the background color of all tablinks/buttons
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
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
        day = currentTime.getDate(),
        minutes = currentTime.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (day < 10)  {
        day = "0" + day;
    }
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const dayNames = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    //document.getElementById('time').innerHTML = hours + ":" + minutes;
    document.getElementById('today').innerHTML = year + " " + monthNames[currentTime.getMonth()] +  " " + day +  " " + dayNames[currentTime.getDay()];

    //Author:Anagha
    /* to be removed later- dummy button functionality*/
    var orderPlaceButtons = document.getElementsByClassName("place_order_btn");
    orderPlaceButtons = Array.from(orderPlaceButtons);
    orderPlaceButtons.forEach(function(btn){
        var tableNum = Number(btn.innerText.charAt(btn.innerText.length-1)-1);
        btn.addEventListener("click", displayOrder.bind(this,btn.innerText,tableNum));
    });
    /*to be removed later*/

    if(localStorage.getItem('ordersMatrix')){//if ordersMatrix exists in localStorage, load current orders from it
        //populate the tables with orders
        for(tNum=0;tNum < 6; tNum++) {//tables
            for(oNum=0;oNum<6;oNum++){//orders
                if(ordersMatrix[tNum][oNum][0] == 1 && ordersMatrix[tNum][oNum][2] != 1) { //'order placed status' is 1 and 'order paid status' is not 1
                    var tableNum = tNum+1;
                    displayOrderOnLoad('Table_' + tableNum, tNum);
                }
            }
        }
    }

    //Append order to view
    function displayOrder(tableName, tableNumber) { //to add orders to view when customer places order

        for (j = 0; j < 6; j++) {
            //if an order has been paid & cleared OR if the order was never placed
            if (isEqual(localStorageGetObj('ordersMatrix')[tableNumber][j], [1, 1, 1]) || isEqual(localStorageGetObj('ordersMatrix')[tableNumber][j], [0, 0, 0])) {
               //paid & cleared order vacancies at each table can now be treated as new orders
                var order = ordersArray[j]; //insert order from the ordersArray based on order vacancies
                var p = document.getElementById(tableName);
                p.insertAdjacentHTML('beforeend', order);
                ordersMatrix[tableNumber][j]=[1,0,0]; //save state in the ordersMatrix (order placed, not delivered, not paid)
                localStorageSetObj('ordersMatrix',ordersMatrix);
                break;
            }
        }

    }
    function displayOrderOnLoad(tableName, tableNumber) { //to reload all the current orders from local storage when app is refreshed

        for (j = 0; j < 6; j++) {
            //paid or unplaced orders need not be displayed
            if (!isEqual(localStorageGetObj('ordersMatrix')[tableNumber][j], [1, 1, 1]) && !isEqual(localStorageGetObj('ordersMatrix')[tableNumber][j], [0, 0, 0])) {
                var order = ordersArray[j]; //insert order from the ordersArray
                var p = document.getElementById(tableName);
                p.insertAdjacentHTML('beforeend', order);
                localStorageSetObj('ordersMatrix',ordersMatrix);

            }
        }

    }

});