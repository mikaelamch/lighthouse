// Populate an array of objects from the JSON database "../Scripts/DB_Beverages.js"
$.getJSON("../JSON/DB_Beverages.json", function(json) {
    console.log(json); // this will show the info it in firebug console
});