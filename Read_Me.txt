Log in:
A user can log in as a bartender with the following credentials: username: Mike, password: 1237
A user can log in as a VIP customer with the following credentials: username: Alex, password: 1234
All the customers can order without logging in the system.


Bartender View:
1. Tables Tab
Once the bartender is logged in with the bartender credentials, he/she can see the orders placed by the customers on the tables.
He/she can then view the order details by clicking on the order numbers that appear on each table.
Once the order has been delivered, the delivered checkbox can be checked and the state will be saved to local memory.
Once the payment has been made, the paid checkbox can be checked and the order is then considered closed and disappears from the corresponding table.
The state is once again saved to local memory.

2.Stock Tab
The stock tab displays all the items available in the databse and some details of each item in the database.
The items can be disabled from the menu by the bartender if he/she selects the checkbox in the disable column corresponding to the item taht needs to
be disabled. This will then remove the item from the customer view (in the menu).

3.On the House Tab
Any of the items in the menu can be given away on the house by the bartender and every item that is given away on the house needs to be dragged and dropped
into the Given on the house today column from the menu column. These actions of adding an item can be undone and redone. However, on refreshing the page, the items dropped in the
'given on the house' column cannot be removed anymore as they are now saved in the local memory.

Customer View:
1. Undo and redo are working as intended – placing an item in the order area can be undone and it works for multiple items in a row,
until the order is empty. After undoing an item in the order, redo will bring it back.
2. Dragging items in the order area adds them to the order when they are dropped there, otherwise they can be dragged around the screen,
without it affecting anything.
3. Adding a person to an order automatically makes it a group order. 
The first person’s choices are saved and then when the “finish” button is pressed, the order is sent to the bartender page 
(it’s saved in local storage). The group order is limited to six people.
4. The language can be changed through the dropdown menu and the text in the buttons and in the model (the pop-up window after
clicking “finish”) is translated between Swedish and English. The items in the menu do not have a translation.
