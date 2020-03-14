//Author: Anagha
$(function() {
    //read the text from translation.json file to populate the view
    function populateText() {
                $.getJSON("JSON/Translation.json", function (translationJson) {
                    //Get the selected language
                    var langSelection = document.getElementsByClassName("lang")[0];
                    var language = langSelection.options[langSelection.selectedIndex].value;

                    //function to populate text based on language selection
                    var allTxtIDs = $("[id*='txt']"); //all components in view with that contains txt in their ID

                    allTxtIDs.each(function (index, item) {
                        item.innerHTML = translationJson[language][item.id];
                    });
        });
    }
    //change language selection event
    $( ".lang" ).change(function() {
        populateText();
    });
    populateText(); //Call once on loading the app

});