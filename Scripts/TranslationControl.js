

/*This is the function to populate text based on language selection.
* Read the text from translation.json file to populate the view*/

function populateText(component) {
    $.getJSON("JSON/Translation.json", function (translationJson) {
        //Get the selected language
        let langSelection = document.getElementsByClassName("lang")[0];
        let language = langSelection.options[langSelection.selectedIndex].value;
        let allTxtIDs;

        if(component){ //translate only for a sub-component of the view (for dynamically added components)
            allTxtIDs = $(component + " *[id*='txt']");
        }
        else
            allTxtIDs = $("[id*='txt']"); //all components in view with that contains txt in their ID

        allTxtIDs.each(function (index, item) {
            item.innerHTML = translationJson[language][item.id];
        });
     });
}

$(function() {
    //change language selection event
    $( ".lang" ).change(function() {
        populateText();
    });
    populateText(); //Call once on loading the app

});