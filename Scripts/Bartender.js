function viewOrderItems(orderNumber){
    //remove previous list added
    var tabContents = document.getElementById("Table_Inner_Container");
    tabContents.removeChild(tabContents.lastChild);
    //Add a list with order items on screen
    var ordersList = '<div class="orders_list" )"><b>Order Number :</b>' + orderNumber+
        '<br><br>Pinacolada' + //need to remove hardcoded data and populate with actual data
        '<br>Bloody Mary'+
        '<br>Cheese Fries (2)'+
        '<br>Samuel Adams Winter Lager<br><br>'+
        '<input type="checkbox" id="delivered_cb" name="delivered" value="delivered">: Delivered<br>'+
        '<input type="checkbox" id="paid_cb" name="paid" value="paid">: Paid' +
        '</div>';

    tabContents.insertAdjacentHTML('beforeend', ordersList);
}

$(function() {
    //Author:Juhee
    //Add click events to tabs
    var tableTab = document.getElementById("bartender_table_view");
    var stockTab = document.getElementById("bartender_stock_view");
    var houseTab = document.getElementById("bartender_house_view");
    tableTab.addEventListener("click", openPage.bind(this,'Table', tableTab, '#ECF0F3'));
    stockTab.addEventListener("click", openPage.bind(this,'Stock', stockTab, '#ECF0F3'));
    houseTab.addEventListener("click", openPage.bind(this,'House', houseTab, '#ECF0F3'));
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

    //Author:Anagha
    /* to be removed later- dummy button functionality*/
    var orderPlaceButtons = document.getElementsByClassName("place_order_btn");
    orderPlaceButtons = Array.from(orderPlaceButtons);
    orderPlaceButtons.forEach(function(btn){
       var tableNum = Number(btn.innerText.charAt(btn.innerText.length-1)-1);
        btn.addEventListener("click", displayOrder.bind(this,btn.innerText,tableNum));
    });
    /*to be removed later*/

    var counterArray = [0,0,0,0,0,0];//counter to keep track of no. of orders per table

    //hardcoded orders 1-8 to be added to view when order is placed
    var ordersArray= ['<div class="table_orders order_1" onClick="viewOrderItems(1)">1</div>',
        '<div class="table_orders order_2" onClick="viewOrderItems(2)">2</div>','<div class="table_orders order_3" onClick="viewOrderItems(3)">3</div>',
        '<div class="table_orders order_4" onClick="viewOrderItems(4)">4</div>', '<div class="table_orders order_5" onClick="viewOrderItems(5)" >5</div>',
        '<div class="table_orders order_6" onClick="viewOrderItems(6)">6</div>'
        ];

    //Append order to view
    function displayOrder(tableName, tableNumber) {
        if(counterArray[tableNumber] > -1) {
            var firstOrder = ordersArray[counterArray[tableNumber]];
            counterArray[tableNumber]++;
            var p = document.getElementById(tableName);
            p.insertAdjacentHTML('beforeend', firstOrder);
            if (counterArray[tableNumber] === 6) { //prevent adding more than 6 orders per table
                counterArray[tableNumber] = -1;
            }
        }
    }

    //Author:Juhee
    //time bar at the bottom
    var currentTime = new Date(),
        year = currentTime.getFullYear(),
        day = currentTime.getDay(),
        hours = currentTime.getHours(),
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
    document.getElementById('time').innerHTML = hours + ":" + minutes;
    document.getElementById('today').innerHTML = year + " " + monthNames[currentTime.getMonth()] +  " " + day +  " " + dayNames[currentTime.getDay()];

});