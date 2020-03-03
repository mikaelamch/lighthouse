/**
 * This file contains the View class for the menu. It will be responsible for creating html elements in the Menu.html file.
 * It is not ideal, but each html block of elements will be defined as a string. In the string there will be some inline js to fill * in the data.
 * @file MenuDynamicView.js
 * @author Alessandra
 */
class MenuDynamicView {
    constructor() {
        this.root = $('#rootMenu')[0];
    }

    /**
     * Creates a card, starting from a template in the form of a string
     * 
     * @param {Number} id id of the element in the DB - will be used in the drag-and-drop
     * @param {String} name name of the beverage
     * @param {String} category additional info
     * @param {String} beverageType type of beverage (beer/wine/cocktail/non-alcoholic)
     * @param {Number} volumeMl size of the serving container available
     * @param {Number} alcoholStrength percentage of alcohol
     * @param {Array<String>} allergies array with some properties
     * @param {Boolean} kosher if it's kosher conformant
     * @param {String} wineColor color of the wine
     * @param {Number} priceWithVat price with taxes applied
     * 
     * @returns {String} a string with the newly populated card
     */
    createItemCard(id, name, category, beverageType, volumeMl, alcoholStrength, allergies, kosher, wineColor, priceWithVat) {
        let cardTemplate = `
            <div id="${id}" class="menu-card">
                <div class="menu-card-title">
                    <h3 id=card-title>${name}</h3>
                </div>
                <div class="menu-card-category">
                    <h4 id="card-category">${category}</h4>
                </div>
                <div class="menu-card-strength"><span id="card-strength">${alcoholStrength}%</span></div>
                <div class="menu-card-allergies">`;

        // If the product has specific characteristics, a string with an unordered list + list items will be concatenated to the cardTemplate one
        if (allergies) {
            let allergyString = `<ul class="menu-allergy-list">`

            allergies.forEach(a => {
                switch (a) {
                    case "organic":
                        allergyString += `<li class="menu-allergy-item"><img src="../Images/Organic-512.png" alt="organic"></li>`;
                        break;

                    case "glutenFree":
                        allergyString += `<li class="menu-allergy-item"><img src="../Images/Gluten_free-512.png" alt="gluten free"></li>`;
                        break;

                    case "lactoseFree":
                        allergyString += `<li class="menu-allergy-item"><img src="../Images/Dairy_free-512.png" alt="lactose free"></li>`;
                        break;
                }
            });

            allergyString += `</ul>`;
            cardTemplate += allergyString;
        }

        cardTemplate += `
                <div class="menu-card-volume"><p>${volumeMl}ml</p></div>
                <div class="menu-card-price"><p>${priceWithVat}:-</p></div>
                <div class="menu-card-type"><p>${beverageType}</p></div>
            </div>`

        return cardTemplate;

    }

    // Utility View methods
    // loadHtml(fileName) {
    //     $.get(fileName, html => {
    //         return html;
    //     });
    // }

    // htmlToElements(html) {
    //     var template = document.createElement('template');
    //     template.innerHTML = html;
    //     return template.content.childNodes;
    // }

    // createElement(tag, text, classes) {
    //     const newElem = $(tag, { text: text });
    //     return newElem;
    // }

    /**
     * Appends new element in the #menuRoot div
     * @param {String} element string containing the html of the DOM element to be inserted in the #menuRoot div
     */
    append(element) {
        $(this.root).append(element)
    }
}

export default MenuDynamicView;